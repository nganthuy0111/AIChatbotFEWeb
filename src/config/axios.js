import axios from "axios";

// Tạo instance Axios
const api = axios.create({
  baseURL: "https://aichatbotlaw.onrender.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Không thêm Authorization cho login/register
    if (
      config.url &&
      (config.url.includes("/Authenticate/login") ||
        config.url.includes("/Authenticate/register"))
    ) {
      return config;
    }
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
