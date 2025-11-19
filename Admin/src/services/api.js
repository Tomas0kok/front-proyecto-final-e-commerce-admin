import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }
}

export function loadAuthTokenFromStorage() {
  const stored = localStorage.getItem("authToken");
  if (stored) {
    authToken = stored;
  }
  return stored;
}

export function clearAuthToken() {
  authToken = null;
  localStorage.removeItem("authToken");
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
