import express from 'express'
import { loginUser, registerUser, profile } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',authMiddleware, profile)

export default router