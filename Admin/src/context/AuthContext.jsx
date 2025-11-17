// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { login as loginRequest } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      const rawUser = localStorage.getItem("authUser");

      if (token && rawUser && rawUser !== "undefined" && rawUser !== "null") {
        const parsedUser = JSON.parse(rawUser);
        setUser(parsedUser);
      }
    } catch (err) {
      console.error("Error leyendo sesión de localStorage", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginRequest(email, password);
    console.log("[AuthContext] respuesta login API:", data);

    const token = data.token;
    const user = data.user;

    if (!token || !user) {
      throw new Error("Respuesta de login inválida: falta token o user");
    }

    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));

    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin: user?.role === "admin" || user?.role === "superadmin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
