import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './src/config/db.js'
import authRouter from './src/routes/authRoute.js'
import userRouter from './src/routes/userRoute.js'
import { errorHandler } from './src/middlewares/errorHandler.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}))

const PORT = process.env.PORT || 4000

connectDB()

app.use('/api', authRouter)
app.use('/api', userRouter)

app.get('/',(req,res) => {
    res.send("API is working.")
})
app.use(errorHandler)

app.listen(PORT, () =>{
    console.log(`The backend is running on http://localhost:${PORT}`);
})