import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection failed:", error.message)
    process.exit(1)
  }
};