import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/axios";
import useAuth from "../hooks/useAuth";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCreditCard,
  faSignOutAlt,
  faEdit,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Profile() {
  const navigate = useNavigate();
  const { userId, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    userName: "",
    userEmail: "",
    image: "",
  });
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("User ID not found. Please login again.");
      setLoading(false);
      return;
    }
    api
      .get(`/User/${userId}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load user information");
        setLoading(false);
      });
  }, [userId]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditProfile = () => {
    setEditData({
      userName: user.userName,
      userEmail: user.userEmail,
      image: user.image || "",
    });
    setAvatarPreview(user.image || "");
    setAvatarFile(null);
    setEditError("");
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditError("");
    setAvatarFile(null);
    setAvatarPreview("");
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setEditError("");
    let imageUrl = editData.image;
    try {
      if (!userId) {
        throw new Error("User ID not found");
      }
      if (avatarFile) {
        // Upload avatar to Firebase Storage
        const storageRef = ref(storage, `avatars/${userId}/${avatarFile.name}`);
        await uploadBytes(storageRef, avatarFile);
        imageUrl = await getDownloadURL(storageRef);
      }
      const res = await api.put(`/User/${userId}`, {
        ...user,
        userName: editData.userName,
        userEmail: editData.userEmail,
        image: imageUrl,
      });
      setUser(res.data);
      setIsEditing(false);
    } catch {
      setEditError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="profile-page">
        <div className="profile-card">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="profile-page">
        <div className="profile-card error">{error}</div>
      </div>
    );
  if (!user) return null;

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
          <button
            className="edit-profile-btn"
            onClick={handleEditProfile}
            title="Edit profile"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <div className="profile-avatar-section">
            <img
              src={user.image || "/src/assets/edulawai.jpg"}
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
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        {isEditing && (
          <div className="edit-profile-modal">
            <form className="edit-profile-form" onSubmit={handleEditSave}>
              <h3>Edit Profile</h3>
              <div className="edit-avatar-upload">
                <label htmlFor="avatar-upload" className="avatar-upload-label">
                  <span>Avatar</span>
                  <div className="avatar-upload-preview">
                    <img
                      src={
                        avatarPreview ||
                        editData.image ||
                        "/src/assets/edulawai.jpg"
                      }
                      alt="avatar preview"
                      className="avatar-preview-img"
                    />
                    <span className="avatar-upload-btn">
                      <FontAwesomeIcon icon={faCamera} />
                    </span>
                  </div>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <label>
                Name
                <input
                  type="text"
                  name="userName"
                  value={editData.userName}
                  onChange={handleEditChange}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="userEmail"
                  value={editData.userEmail}
                  onChange={handleEditChange}
                  required
                />
              </label>
              {editError && <div className="edit-error">{editError}</div>}
              <div className="edit-profile-actions">
                <button
                  type="button"
                  onClick={handleEditCancel}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
