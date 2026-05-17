import express from 'express'
import { getUsers, getUser,updateUser,deleteUser } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { adminMiddleware } from '../middlewares/adminMiddleware.js'

const userRouter = express.Router()

userRouter.get('/users',authMiddleware,adminMiddleware, getUsers)
userRouter.get('/users/:id',authMiddleware, getUser)
userRouter.put('/users/:id',authMiddleware,adminMiddleware, updateUser)
userRouter.delete('/users/:id',authMiddleware,adminMiddleware, deleteUser)

export default userRouter