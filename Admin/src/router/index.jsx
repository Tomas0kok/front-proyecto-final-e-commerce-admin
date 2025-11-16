// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/admin/Layout";
import Dashboard from "@/pages/admin/Dashboard";
import Subscriptions from "@/pages/admin/Subscriptions";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "subscriptions", element: <Subscriptions /> },
    ],
  },
]);

export default router;
