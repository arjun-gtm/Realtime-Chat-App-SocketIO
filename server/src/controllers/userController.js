import expressAsyncHandler from "express-async-handler";
import { constants } from "../../constants.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";

export const registerUser = expressAsyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("All fields are required.")
    }

    const alreadyRegistered = await user.findOne({ email })
    if (alreadyRegistered) {
        res.status(400)
        throw new Error("Email is already registered.")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    })

    await newUser.save()

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })

    res.status(201).json({
        message: "User registered successfully.",
        token: token
    })
})

export const loginUser = expressAsyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Login User"
    })
})