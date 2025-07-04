import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

function HeaderUser() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleProfileClick = () => {
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
          <Link to="/search">Search</Link>
          <Link to="/about">About</Link>
        </nav>
        <div className="header-right">
          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <FontAwesomeIcon
                icon={faUser}
                style={{ cursor: "pointer" }}
                onClick={handleProfileClick}
                title="Profile"
              />
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ cursor: "pointer", color: "#ff6b6b" }}
                onClick={handleLogout}
                title="Logout"
              />
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link to="/login" className="header-btn">
                Login
              </Link>
              <Link to="/register" className="header-signin">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default HeaderUser;
