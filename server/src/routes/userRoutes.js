import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js'
import { errorHandler } from '../middlewares/errorHandler.js'

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)

export default router