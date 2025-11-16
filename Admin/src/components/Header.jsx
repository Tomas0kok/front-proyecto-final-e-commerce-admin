import { Bell, Search, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-light border-bottom sticky-top shadow-sm">
      <div className="container-fluid px-4 py-3 d-flex align-items-center justify-content-between gap-3">
        {/* Search */}
        <div
          className="flex-grow-1 position-relative"
          style={{ maxWidth: "400px" }}
        >
          <Search
            className="position-absolute"
            style={{
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "18px",
              height: "18px",
              color: "#6c757d",
            }}
          />
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Buscar..."
            style={{
              backgroundColor: "#fff",
              borderColor: "#dee2e6",
            }}
          />
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
