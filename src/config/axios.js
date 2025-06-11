import axios from "axios";

// Tạo instance Axios
const api = axios.create({
  baseURL: "https://aichatbotlaw.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default api;
