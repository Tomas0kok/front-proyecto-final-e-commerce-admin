import { Bell, User } from "lucide-react";

const Header = () => {
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

          <button
            type="button"
            className="btn btn-light rounded-circle p-2 border-0"
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
