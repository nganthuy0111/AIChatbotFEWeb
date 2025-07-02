import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { MenuItem } from "@mui/material";
import useAuth from "../../hooks/useAuth";

function HeaderUser() {
  const navigate = useNavigate();
  const { isAuthenticated, userRole, logout } = useAuth();

  const handleProfileClick = () => {
    // Chuyển hướng sang trang profile (cần tạo route nếu chưa có)
    navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img
            src="./src/assets/logo.png"
            alt="EduLawAI Logo"
            className="logo-image"
          />
          <Link to="/home">EduLawAI</Link>
        </div>
        <nav className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/admin">Instructions</Link>
          <Link to="/about">About</Link>
          <Link to="/search">Search</Link>
        </nav>
        <div className="header-right">
          <div className="notifications">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="profile">
            {isAuthenticated ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {userRole && (
                  <span style={{ color: "#fff", fontSize: "14px" }}>
                    {userRole}
                  </span>
                )}
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ cursor: "pointer" }}
                  onClick={handleProfileClick}
                />
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  style={{ cursor: "pointer", color: "#ff6b6b" }}
                  onClick={handleLogout}
                  title="Đăng xuất"
                />
              </div>
            ) : (
              <>
                <Link to="/login" className="header-btn">
                  Login
                </Link>
                <Link to="/register" className="header-signin">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderUser;
