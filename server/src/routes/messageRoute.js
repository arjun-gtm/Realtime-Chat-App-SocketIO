import express from "express";
import { getMessages } from "../controllers/messageController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const messageRouter = express.Router();

messageRouter.get("/messages", authMiddleware, getMessages);

export default messageRouter;