import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCreditCard,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const navigate = useNavigate();
  // Dữ liệu code cứng
  const user = {
    userName: "Nguyễn Văn A",
    userEmail: "nguyenvana@example.com",
    role: "Admin",
    userStatus: "Active",
    image: "/src/assets/edulawai.jpg",
    createdAt: "2023-01-15T00:00:00Z",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

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
            <img src={user.image} alt="avatar" className="profile-avatar" />
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
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
