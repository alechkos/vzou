import { TypedRequestBody } from '../types/RequestType.js'
import { NextFunction, Response } from 'express'
import TWOFA from '../models/2FA.js'
import ApiError from '../error/ApiError.js'
import { CODE_TYPES, RESET_PW_2FA_BODY, SET_2FA_STATUS_BODY, TWOFA_VERIFY_BODY } from '../types/TWOFA_Types.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { mailer } from '../nodemailer/MailSender.js'
import { generateConfirmMailToken, generateJwt } from './UserController.js'
import dotenv from 'dotenv'
import pkg from 'jsonwebtoken'

// Use jsonwebtoken lib to access the verify function, used to decode JWT encrypted tokens in the controller below.
const { verify } = pkg
dotenv.config() // Load environmental variables (check .env file for full list)

/**
 * * Receives a code, the type of the code (2FA, password reset, email confirmation) and an email,
 *   and verifies the code's validity.
 *
 *   The code received comes from the email sent to the user, and is considered expired if it's more than 5 minutes old.
 */
export const TWO_FA_verifier = async (code: string, type: CODE_TYPES, email: string) => {
  if (!code || !type || !email) {
    throw new ApiError(401, '2FA required')
  }
  const match = await TWOFA.findOne({ where: { code, type: type.toString(), email } })
  if (!match) {
    throw new ApiError(401, 'Code is incorrect')
  }
  // Use Date library to get the current time, and compare it to time the last code was sent to the user.
  // If the difference is more than 5 minutes, the code is considered expired.
  const diffInMinutes = Math.floor((Date.now() - match.updatedAt.valueOf()) / 1000 / 60)
  if (diffInMinutes > 5) {
    throw new ApiError(401, '2FA Code expired')
  }
}

/** General use function that receives an email and a code type,
 *  and sends an email with either an email confirmation token, or a 2FA / password-reset code.
 */
export const ServiceSendCode = async (type: CODE_TYPES, email: string) => {
  if (type !== 'VERIFY_EMAIL') {
    // For 2FAs or password resets, send a new code and update the database.
    const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000) // Randomize a code
    await TWOFA.upsert({ email, code: code.toString(), type }) // Update or create a new 2FA code for the user.
    mailer(`${type} Code`, code.toString(), email) // Send the mail with the code
    return
  }
  // For email confirmations, validate the data received and send a confirmation email to the user.
  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw ApiError.forbidden('Error sending email')
  }
  const token = generateConfirmMailToken(email)
  mailer(
    // Send the email with the token
    `Email verification`,
    `To verify the email follow the link : 
    ${process.env.FRONT_IP || 'http://localhost:3000'}/verify-email/${token}`,
    email
  )
}

/** Controller for the entire 2FA process.
 *  Contains functionalities such as:
 *    - Sending 2FA code
 *    - Verifying 2FA code
 *    - Setting 2FA status
 *    - Resetting password
 *    - Confirming email
 *
 *  The controller is used to handle all the requests to the /2fa route.
 */
class TwoFactorAuthController {
  async send2FA_Code(req: TypedRequestBody<{ type: CODE_TYPES; email: string }>, res: Response, next: NextFunction) {
    const { type, email } = req.body
    try {
      await ServiceSendCode(type, email)
      return res.json({ status: 'OK' })
    } catch (e: any) {
      console.log(e)
      const message = 'Error sending email'
      return next(ApiError.badRequest(message))
    }
  }

  async verify(req: TypedRequestBody<TWOFA_VERIFY_BODY>, res: Response, next: NextFunction) {
    try {
      const { code, type, email } = req.body
      await TWO_FA_verifier(code, type, email)
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return res.status(500).json({ message: 'Unknown error, user not found' })
      }
      const accessToken = generateJwt(user)
      if (type === '2FA') {
        if (user.role == 'Lecturer') {
          return res.json({
            status: 'OK',
            token: accessToken,
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
              is2FA: user.isEnabled2FA
            }
          })
        }
        return res.json({
          status: 'OK',
          token: accessToken,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            birthYear: user.birthYear,
            gender: user.gender,
            is2FA: user.isEnabled2FA
          }
        })
      } else {
        return res.json({ status: 'OK' })
      }
    } catch (e: any) {
      const message = e?.message || 'Unknown error'
      return res.status(401).json({ message })
    }
  }

  async resetPassword(req: TypedRequestBody<RESET_PW_2FA_BODY>, res: Response, next: NextFunction) {
    try {
      const { password, email } = req.body
      if (!password || password.length < 8) {
        return next(ApiError.badRequest('Password should be at least 8 char length'))
      }
      const hashPassword = await bcrypt.hash(password, 5)
      await User.update({ password: hashPassword }, { where: { email } })
      return res.json({ status: 'OK' })
    } catch (e: any) {
      console.log(e)
      const message = e?.errors?.length > 0 && e?.errors[0]?.message ? e.error[0].message : 'Input error'
      return next(ApiError.badRequest(message))
    }
  }

  async verifyEmail(req: TypedRequestBody<{ token: string }>, res: Response, next: NextFunction) {
    try {
      const { token } = req.body
      if (!token) {
        return res.status(401).json({ message: 'Verify token is required' })
      }
      // Decode the token, and get the email from it. Check JWT documentations for more info.
      const decoded = verify(token, process.env.JWT_SECRET_KEY as string) as { email: string; type: CODE_TYPES }
      await User.update({ isEmailConfirmed: true }, { where: { email: decoded.email } })
      res.json({ status: 'OK' })
    } catch (e) {
      console.log(e)
      return res.status(401).json({ message: 'Error verifying the email' })
    }
  }
}

export default new TwoFactorAuthController()
