// src/router/index.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Subscriptions from "../pages/Subscriptions";
import Content from "../pages/Content";
import Products from "../pages/Products";
import Services from "../pages/Services";
import NotFound from "../pages/Notfound";
import Login from "../pages/Login";

import NewProductModal from "../pages/NewModals/NewProductModal";
import NewServiceModal from "../pages/NewModals/NewServiceModal";

const router = createBrowserRouter([
  // Redirección raíz → admin dashboard
  {
    path: "/",
    element: <Navigate to="/admin/dashboard" replace />,
  },

  // Login público
  {
    path: "/login",
    element: <Login />,
  },

  // Bloque protegido /admin/*
  {
    path: "/admin",
    element: <ProtectedRoute />, 
    children: [
      {
        element: <Layout />, // Header + Sidebar 
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "subscriptions", element: <Subscriptions /> },
          { path: "content", element: <Content /> },
          {
            path: "products",
            element: <Products />,
            children: [{ path: "new", element: <NewProductModal /> }],
          },
          {
            path: "services",
            element: <Services />,
            children: [{ path: "new", element: <NewServiceModal /> }],
          },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },

  // 404 global
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
