import React, { useState } from "react";

const ChatPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [messages, setMessages] = useState([
    { id: 1, from: "Alice", text: "Hi there!" },
    { id: 2, from: user?.name || "You", text: "Hello!" },
    { id: 3, from: "Bob", text: "Welcome to the chat." },
  ]);
  const [text, setText] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newMessage = { id: Date.now(), from: user?.name || "You", text };
    setMessages((m) => [...m, newMessage]);
    setText("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Chat</h3>
          <div className="text-sm text-gray-600">Signed in as {user?.name || "Guest"}</div>
        </header>

        <main className="p-4 h-[60vh] flex flex-col">
          <div className="flex-1 overflow-auto mb-4 space-y-3" id="messages">
            {messages.map((m) => (
              <div key={m.id} className={`p-3 rounded-lg max-w-md ${m.from === (user?.name || "You") ? "bg-blue-100 ml-auto" : "bg-gray-100"}`}>
                <div className="text-xs text-gray-500 mb-1">{m.from}</div>
                <div>{m.text}</div>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="flex items-center gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message"
              className="flex-1 px-4 py-2 border rounded-lg outline-none"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Send</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;