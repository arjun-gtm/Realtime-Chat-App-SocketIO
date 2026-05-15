import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js'
import { errorHandler } from '../middlewares/errorHandler.js'

const router = express.Router()

router.post('/register',errorHandler,registerUser)
router.post('/login',errorHandler,loginUser)

export default router