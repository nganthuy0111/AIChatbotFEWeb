import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    const id = localStorage.getItem("userId");

    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserId(id);
    }
    setLoading(false);
  }, []);

  const login = (token, role, id) => {
    localStorage.setItem("token", token);
    if (role) localStorage.setItem("userRole", role);
    if (id) localStorage.setItem("userId", id);

    setIsAuthenticated(true);
    setUserRole(role);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");

    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
  };

  const isAdmin = () => {
    return userRole === "Admin" || userRole === "admin";
  };

  return {
    isAuthenticated,
    userRole,
    userId,
    loading,
    login,
    logout,
    isAdmin,
  };
};

export default useAuth;
