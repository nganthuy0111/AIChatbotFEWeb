import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCreditCard,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";
import api from "../config/axios";

function Profile() {
  const navigate = useNavigate();
  const { userId, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("Không xác định được người dùng. Vui lòng đăng nhập lại.");
      setLoading(false);
      return;
    }
    setLoading(true);
    api
      .get(`/User/${userId}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải thông tin người dùng.");
        setLoading(false);
      });
  }, [userId]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="profile-page with-sidebar">
        <div className="profile-content-center">Đang tải thông tin...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="profile-page with-sidebar">
        <div className="profile-content-center" style={{ color: "red" }}>
          {error}
        </div>
      </div>
    );
  }
  if (!user) {
    return null;
  }

  return (
    <div className="profile-page with-sidebar">
      <aside className="user-sidebar menu-modern">
        <div className="sidebar-title">Your Profile</div>
        <div className="sidebar-menu-modern">
          <button
            className="sidebar-item-modern"
            onClick={() => navigate("/home")}
          >
            <FontAwesomeIcon icon={faHome} /> Home
          </button>
          <button
            className="sidebar-item-modern selected"
            onClick={() => navigate("/profile")}
          >
            <FontAwesomeIcon icon={faUser} /> Profile
          </button>
          <button
            className="sidebar-item-modern"
            onClick={() => navigate("/payment")}
          >
            <FontAwesomeIcon icon={faCreditCard} /> Payment
          </button>
          <button className="sidebar-item-modern" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </aside>
      <div className="profile-content-center">
        <div className="profile-card modern">
          <div className="profile-avatar-section">
            <img
              src={user.image || "/src/assets/logoEduLawAI.png"}
              alt="avatar"
              className="profile-avatar"
            />
            <h2>{user.userName}</h2>
            <span
              className={`status-badge ${
                user.userStatus === "Active" ? "active" : "inactive"
              }`}
            >
              {user.userStatus}
            </span>
          </div>
          <div className="profile-info-list">
            <div className="profile-info-item">Email: {user.userEmail}</div>
            <div className="profile-info-item">Role: {user.role}</div>
            <div className="profile-info-item">
              Joined:{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
