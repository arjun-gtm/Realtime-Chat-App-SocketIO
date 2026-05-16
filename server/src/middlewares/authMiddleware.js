import expressAsyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js"

export const authMiddleware = expressAsyncHandler (async (req,res,next) => {

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401)
        throw new Error("Unauthorized")
    }

    const token = authHeader.split(' ')[1]

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!verifiedToken) {
        res.status(401)
        throw new Error("Unauthorized")
    }

    const user = await User.findById(verifiedToken.id).select("-password")

    if (!user) {
        res.status(401)
        throw new Error("No user found")
    }

    req.user = user
    
    next()

})