import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../Layouts/DashboardLayout";

import Dashboard from "../Pages/Dashboard";
import Transactions from "../Pages/Transactions";
import Analytics from "../Pages/Analytics";
import Settings from "../Pages/Settings";

const router = createBrowserRouter([
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
