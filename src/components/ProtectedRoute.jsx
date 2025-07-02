import React from "react";
import { Navigate } from "react-router-dom";
import AccessDenied from "./AccessDenied";

const ProtectedRoute = ({ children, requiredRole = "Admin" }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // Kiểm tra xem user đã đăng nhập chưa
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra role nếu cần
  if (requiredRole && userRole !== requiredRole && userRole !== "admin") {
    // Nếu không phải admin, hiển thị trang Access Denied
    return <AccessDenied />;
  }

  return children;
};

export default ProtectedRoute;
