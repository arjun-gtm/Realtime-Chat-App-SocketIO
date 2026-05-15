import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './src/config/db.js'
import router from './src/routes/userRoutes.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}))

const PORT = process.env.PORT || 4000

connectDB()

app.use('/api', router)

app.get('/',(req,res) => {
    res.send("API is working.")
})

app.listen(PORT, () =>{
    console.log(`The backend is running on http://localhost:${PORT}`);
})