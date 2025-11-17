// src/pages/Login.jsx
import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, login } = useAuth();
  const location = useLocation();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin123!");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/admin/dashboard";

  // 🔴 Si ya estoy logueado, NO renderizo el form → redirijo
  if (user) {
    console.log("[Login] usuario ya logueado, redirigiendo a:", from);
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    console.log("[Login] submit disparado con:", { email, password });

    try {
      const loggedUser = await login(email, password);
      console.log("[Login] login OK, user:", loggedUser);
      // No hacemos navigate acá: el redirect lo hace el <Navigate /> de arriba
    } catch (err) {
      console.error("[Login] error en login:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Credenciales inválidas o error de servidor.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-8 col-md-5 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <span className="fw-bold text-success text-uppercase small">
                  EcoAdmin
                </span>
                <h1 className="h4 fw-bold mb-1 mt-1">Iniciar sesión</h1>
                <p className="text-muted small mb-0">
                  Accede al panel de administración
                </p>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small mb-3">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
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
                    autoComplete="current-password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-2"
                  disabled={submitting}
                >
                  {submitting ? "Ingresando..." : "Ingresar"}
                </button>
              </form>

              <p className="text-muted small text-center mt-3 mb-0">
                Para pruebas: <code>admin@example.com / Admin123!</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
