import axios from "axios";

// Use the API URL from environment variables or fallback to localhost
const API_BASE_URL ='https://alfredtask-akvx.onrender.com/api';

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
