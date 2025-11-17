// src/components/Header.jsx
import { useState } from "react";
import { Bell, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const displayName = user
    ? `${user.firstname || ""} ${user.lastname || ""}`.trim() || user.email
    : "Invitado";

  return (
    <header className="bg-light border-bottom sticky-top shadow-sm">
      <div className="container-fluid px-4 py-3 d-flex align-items-center justify-content-between gap-3">
        {/* Brand / Título del panel */}
        <div className="d-flex flex-column">
          <span className="fw-bold text-success text-uppercase small">
            EcoAdmin
          </span>
          <span className="fw-semibold">Panel de administración</span>
        </div>

        {/* Actions */}
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-light position-relative rounded-circle p-2 border-0"
          >
            <Bell size={20} />
            <span
              className="position-absolute top-0 end-0 translate-middle p-1 bg-danger border border-light rounded-circle"
              style={{ width: "8px", height: "8px" }}
            ></span>
          </button>

          <Dropdown align="end">
            <Dropdown.Toggle
              variant="light"
              className="d-flex align-items-center gap-2 border-0"
              id="user-menu"
            >
              <div className="btn btn-light rounded-circle p-2 border-0 d-flex align-items-center justify-content-center">
                <User size={20} />
              </div>
              <span className="small fw-semibold d-none d-md-inline">
                {displayName}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Header>
                <div className="small text-muted">Sesión</div>
                <div className="fw-semibold">{displayName}</div>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => navigate("/profile")}>
                Mi perfil (futuro)
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-danger" onClick={handleLogout}>
                Cerrar sesión
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
