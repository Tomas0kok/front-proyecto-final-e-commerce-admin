import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  GraduationCap,
  CreditCard,
  FileText,
  Leaf,
  Menu,
} from "lucide-react";
import "./Sidebar.css";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: ShoppingBag, label: "Productos", path: "/products" },
  { icon: GraduationCap, label: "Servicios", path: "/services" },
  { icon: CreditCard, label: "Suscripciones", path: "/subscriptions" },
  { icon: FileText, label: "Contenido", path: "/content" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-dark text-white border-end border-secondary position-sticky top-0 vh-100 d-flex flex-column transition-all ${
        collapsed ? "sidebar-collapsed" : "sidebar-expanded"
      }`}
      style={{
        width: collapsed ? "70px" : "240px",
        transition: "width 0.3s ease",
      }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary">
        {!collapsed && (
          <div className="d-flex align-items-center gap-2">
            <Leaf size={24} className="text-success" />
            <span className="fw-semibold">EcoAdmin</span>
          </div>
        )}
        <button
          className="btn btn-sm btn-outline-light border-0"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow-1 p-3">
        <ul className="nav flex-column gap-2">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-3 rounded-3 px-3 py-2 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-light hover-bg-dark-subtle"
                  }`
                }
                style={{
                  transition: "background-color 0.2s",
                }}
              >
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
