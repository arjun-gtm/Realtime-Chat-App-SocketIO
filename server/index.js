import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./src/socket/socket.js";

import { connectDB } from "./src/config/db.js";
import authRouter from "./src/routes/authRoute.js";
import userRouter from "./src/routes/userRoute.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();
dotenv.config();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

const PORT = process.env.PORT || 4000;

connectDB();

app.use("/api", authRouter);
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("API is working.");
});

initializeSocket(io);

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`The backend is running on http://localhost:${PORT}`);
});