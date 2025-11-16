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
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: ShoppingBag, label: "Productos", path: "/admin/products" },
  { icon: GraduationCap, label: "Servicios", path: "/admin/services" },
  { icon: CreditCard, label: "Suscripciones", path: "/admin/subscriptions" },
  { icon: FileText, label: "Contenido", path: "/admin/content" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-dark text-white border-end border-secondary position-sticky top-0 vh-100 d-flex flex-column sidebar-root ${
        collapsed ? "sidebar-collapsed" : "sidebar-expanded"
      }`}
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
          type="button"
          className="btn btn-sm btn-outline-light border-0"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={
            collapsed ? "Expandir menú lateral" : "Colapsar menú lateral"
          }
          aria-pressed={collapsed}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav
        className="flex-grow-1 p-3"
        aria-label="Navegación principal del panel"
      >
        <ul className="nav flex-column gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  title={item.label} // útil cuando está colapsado
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center gap-3 rounded-3 px-3 py-2 sidebar-link ${
                      isActive ? "sidebar-link-active" : "sidebar-link-inactive"
                    }`
                  }
                >
                  <Icon size={18} />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
