import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : "https://realtime-chat-app-socketio-2lsu.onrender.com";

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export default socket;