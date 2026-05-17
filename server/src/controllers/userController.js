import expressAsyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"

export const getUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find().select("-password")

    res.status(200).json({
        totalUsers: users.length,
        users
    })
})

export const getUser = expressAsyncHandler(async (req, res) => {
    const userId = req.params.id
    const user = await User.findById(userId).select("-password")

    if (!user) {
        res.status(404)
        throw new Error("No user found.")
    }

    res.status(200).json(user)
})

export const updateUser = expressAsyncHandler(async (req, res) => {

    const userId = req.params.id

    const user = await User.findById(userId)

    if (!user) {
        res.status(404)
        throw new Error("No user found.")
    }

    const { name, email, password } = req.body

    user.name = name || user.name
    user.email = email || user.email

    if (password) {
        if (password.length < 8) {
            res.status(400)
            throw new Error("Password must be at least 8 characters long.")
        }

        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()


    res.status(200).json({
        message: "User updated successfully.",
        user: {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        },
    })
})


export const deleteUser = expressAsyncHandler(async (req,res) => {

    const userId = req.params.id

    const user = await User.findById(userId)

    if (!user) {
        res.status(404)
        throw new Error("No user found.")
    }

    await user.deleteOne()

    res.status(200).json({
        message: "User deleted successfully."
    })

})