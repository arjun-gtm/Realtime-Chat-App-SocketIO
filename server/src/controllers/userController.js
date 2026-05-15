import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";

export const registerUser = expressAsyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("All fields are required.")
    }

    const alreadyRegistered = await User.findOne({ email })
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

    const token = jwt.sign({
        id: newUser._id
    }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })

    res.status(201).json({
        message: "User registered successfully.",
        token,
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        },
    })
})

export const loginUser = expressAsyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are required.")
    }

    const user = await User.findOne({ email })

    if (!user) {
        res.status(401)
        throw new Error("Invalid email or password.")
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        res.status(401)
        throw new Error("Password do not match.")
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })

    res.status(200).json({
        message: "Login Successful.",
        token: token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
})