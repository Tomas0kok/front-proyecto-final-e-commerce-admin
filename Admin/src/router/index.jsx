import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Subscriptions from "../pages/Subscriptions";
import Content from "../pages/Content";
import Products from "../pages/Products";
import Services from "../pages/Services";
import NotFound from "../pages/Notfound";

const router = createBrowserRouter([
  // 🔹 Redirección global
  {
    path: "/",
    element: <Navigate to="/admin/dashboard" replace />,
  },

  // 🔹 Rutas del panel admin
  {
    path: "/admin",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "subscriptions", element: <Subscriptions /> },
      { path: "content", element: <Content /> },
      { path: "products", element: <Products /> },
      { path: "services", element: <Services /> },
      { path: "*", element: <NotFound /> },
    ],
  },

  // 🔹 404 global para rutas fuera de /admin
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
