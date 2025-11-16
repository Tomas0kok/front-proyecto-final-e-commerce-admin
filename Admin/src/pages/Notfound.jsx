import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-3 fw-bold mb-3 text-dark">404</h1>
        <p className="fs-5 text-muted mb-4">¡Oops! Página no encontrada</p>
        <a href="/" className="text-decoration-none text-primary fw-semibold">
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
