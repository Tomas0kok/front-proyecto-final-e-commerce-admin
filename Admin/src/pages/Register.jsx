// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { registerUser, login as loginRequest } from "../services/authService";

const Register = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await registerUser({ firstname, lastname, email, password });
      // opcional: loguear automáticamente
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar el usuario.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h1 className="h4 fw-bold mb-3 text-center">EcoAdmin</h1>
        <p className="text-muted text-center mb-4">
          Crea tu cuenta para acceder al panel
        </p>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={submitting}
          >
            {submitting ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <small className="text-muted">
            ¿Ya tenés cuenta? <a href="/login">Inicia sesión</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
