// src/api/api.js
import axios from "axios";

const BASE =
  import.meta.env.VITE_API_URL || "https://havenstay-production.up.railway.app";

const api = axios.create({
  baseURL: BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
