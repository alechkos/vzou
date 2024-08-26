import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { sequelize } from './db.js'
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware.js'
import LecturerRouter from './routes/LecturerRoutes.js'
import UserRouter from './routes/UserRoutes.js'
import UserInputRouter from './routes/UserInputRoutes.js'
// uncomment 2 next lines for production
// import fs from 'fs'
// import https from 'https'
dotenv.config()

// uncomment 3 next lines for production
// const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH || '../certificate/STAR_sce-fpm_com.key', 'utf8')
// const certificate = fs.readFileSync(process.env.CERT_KEY_PATH || '../certificate/STAR_sce-fpm_com.crt', 'utf8')
// const credentials = { key: privateKey, cert: certificate }
const app = express()
const PORT = process.env.PORT || 3001
app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use('/api/user', UserRouter)
app.use('/api/lecturer', LecturerRouter)
app.use('/api/input', UserInputRouter)
// uncomment the next line for production
// const server = https.createServer(credentials, app)
//Error Handler - Last middleware
app.use(ErrorHandlingMiddleware)
const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT)
    // uncomment for production
    // server.listen(PORT)
  } catch (e) {
    console.log(e)
  }
}
export default app
start()
