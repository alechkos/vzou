import { TypedRequestBody } from '../types/RequestType.js'
import { IUserDeleteInput, IUserGetInput, UserInputT } from '../types/UserInputTypes.js'
import { NextFunction, Response } from 'express'
import UserInput from '../models/UserInput.js'
import ApiError from '../error/ApiError.js'

class UserInputController {
  async addInput(req: TypedRequestBody<UserInputT>, res: Response, next: NextFunction) {
    const { userID, subject, algorithm, actionDate, input, size } = req.body
    try {
      await UserInput.create({
        userID,
        input,
        actionDate,
        subject,
        algorithm,
        size
      })
      return res.json({ message: 'Input created!' })
    } catch (e: any) {
      return next(ApiError.badRequest('Input error'))
    }
  }

  async getInput(req: TypedRequestBody<IUserGetInput>, res: Response, next: NextFunction) {
    const { userID, subject, algorithm } = req.body
    const userInput = await UserInput.findAll({ where: { userID, subject, algorithm } })
    if (!userInput) {
      return next(ApiError.internal('No user input'))
    }
    return res.json(userInput)
  }

  async deleteOne(req: TypedRequestBody<IUserDeleteInput>, res: Response, next: NextFunction) {
    const { userID, subject, algorithm, input } = req.body
    const userInput = await UserInput.findOne({ where: { userID, subject, algorithm, input } })
    if (!userInput) {
      return next(ApiError.internal('No user input'))
    }
    await userInput.destroy()
    return res.json({ message: 'User input has been deleted!' })
  }

  async deleteAll(req: TypedRequestBody<IUserGetInput>, res: Response, next: NextFunction) {
    const { userID, subject, algorithm } = req.body
    const userInput = await UserInput.findAll({ where: { userID, subject, algorithm } })
    if (!userInput) {
      return next(ApiError.internal('No user input'))
    }
    userInput.forEach(async input => await input.destroy())
    return res.json({ message: 'User input has been deleted!' })
  }
}

export default new UserInputController()
