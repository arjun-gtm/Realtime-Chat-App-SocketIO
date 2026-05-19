import Message from "../models/messageModel.js";

export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("user_join", (user) => {
      socket.broadcast.emit("user_joined", {
        message: `${user?.name} joined the chat`,
        user,
      });
    });

    socket.on("send_message", async (data) => {
      const newMessage = await Message.create({
        sender: data.sender,
        message: data.message,
      });

      const savedMessage = await newMessage.populate("sender", "name email role");

      io.emit("receive_message", savedMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};