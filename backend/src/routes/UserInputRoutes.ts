import { Router } from 'express'
import UserInputController from '../controllers/UserInputController.js'
import authMiddleware from '../middleware/AuthMiddleware.js'

const router = Router()

router
  .post('/add-input', authMiddleware, UserInputController.addInput)
  .get('/get-input/:id/:subject', authMiddleware, UserInputController.getInput)
  .delete('/delete-one', authMiddleware, UserInputController.deleteOne)
  .delete('/delete-all', authMiddleware, UserInputController.deleteAll)

export default router
