import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // If there is no token, the user is not logged in.
  if (token === null) {
    return <Navigate to="/login" replace />;
  }

  // If there is no user, or the user is not an admin, block this page.
  if (user === null || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
