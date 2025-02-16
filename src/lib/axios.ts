import axios from "axios";

// Use the API URL from environment variables or fallback to localhost
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
