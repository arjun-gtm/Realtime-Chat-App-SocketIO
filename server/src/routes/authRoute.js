import express from 'express'
import { loginUser, registerUser, profile } from '../controllers/authController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const authRouter = express.Router()

authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)
authRouter.get('/profile',authMiddleware, profile)

export default authRouter