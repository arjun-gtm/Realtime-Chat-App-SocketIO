import React, { useEffect, useState } from "react";
import socket from "../socket.js";

const ChatPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.connect();

    socket.emit("user_join", user);

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("user_joined", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          _id: Date.now(),
          sender: { name: "System" },
          message: data.message,
        },
      ]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_joined");
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    socket.emit("send_message", {
      sender: user.id,
      message: text,
    });

    setText("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        
        <header className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Realtime Chat</h3>

          <div className="text-sm text-gray-600">
            Signed in as {user?.name}
          </div>
        </header>

        <main className="p-4 h-[60vh] flex flex-col">
          
          <div className="flex-1 overflow-auto mb-4 space-y-3">
            {messages.map((m, index) => (
              <div
                key={m._id || index}
                className={`p-3 rounded-lg max-w-md ${
                  m.sender?.name === user?.name
                    ? "bg-blue-100 ml-auto"
                    : "bg-gray-100"
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">
                  {m.sender?.name}
                </div>

                <div>{m.message}</div>
              </div>
            ))}
          </div>

          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2"
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message"
              className="flex-1 px-4 py-2 border rounded-lg outline-none"
            />

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Send
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;