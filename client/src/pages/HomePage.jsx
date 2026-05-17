import React from "react";
import { useNavigate, Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const username = user === null ? "User" : user.name;
  const isAdmin = user !== null && user.role === "admin";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Welcome, {username}</h2>
            <p className="text-sm text-gray-500">Start chatting with your friends</p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/chat" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Go to Chat
            </Link>

            {isAdmin && (
              <Link to="/admin" className="px-4 py-2 bg-gray-800 text-white rounded-lg">
                Admin Dashboard
              </Link>
            )}

            <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded-lg">
              Logout
            </button>
          </div>
        </div>

        <div className="text-gray-700">
          <p>This is the home page. Click "Go to Chat" to open the chat.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
