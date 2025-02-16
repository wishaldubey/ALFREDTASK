import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Use the API URL from environment variables or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      // Check token expiration before adding it to headers
      const decoded = jwtDecode<{ exp: number }>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        // Token expired, remove it and redirect to login
        localStorage.removeItem("token");
        window.location.href = "/login";
        return config;
      }

      // Add token to headers
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      // Invalid token, remove it and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  return config;
});

// Optional: Handle 401 unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired, log the user out
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
