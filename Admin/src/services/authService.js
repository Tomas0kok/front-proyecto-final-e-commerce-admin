import api, {
  setAuthToken,
  clearAuthToken,
  loadAuthTokenFromStorage,
} from "./api";

export const login = async (email, password) => {
  const res = await api.post("/users/auth/login", { email, password });
  // res.data debería ser { message, token, user }
  return res.data;
};

export async function registerUser(payload) {
  // OJO: este register crea usuarios role "client" según tu back
  const res = await api.post("/users/auth/register", payload);
  return res.data.user;
}

export async function fetchCurrentUser() {
  const res = await api.get("/users/me");
  return res.data;
}

export function initAuthFromStorage() {
  return loadAuthTokenFromStorage();
}

export function logout() {
  clearAuthToken();
}
