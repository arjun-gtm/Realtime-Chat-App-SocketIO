import expressAsyncHandler from "express-async-handler";
import Message from "../models/messageModel.js";

export const getMessages = expressAsyncHandler(async (req, res) => {
  const messages = await Message.find()
    .populate("sender", "name email role")
    .sort({ createdAt: 1 });

  res.status(200).json({
    totalMessages: messages.length,
    messages,
  });
});