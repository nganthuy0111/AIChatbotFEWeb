import React from "react";
import { Link } from "react-router-dom";
import "./HeaderUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";

function HeaderUser() {
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
          <Link to="/home">Trang chủ</Link>
          <Link to="/admin">Hướng dẫn</Link>
          <Link to="/about">Giới thiệu</Link>
          <Link to="/search">Tra cứu</Link>
        </nav>
        <div className="header-right">
          <div className="notifications">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="profile">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderUser;
