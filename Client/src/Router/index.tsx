import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";

import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";

const router = createBrowserRouter([
  // =========================
  // Authentication
  // =========================
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },

  // =========================
  // Dashboard
  // =========================
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
