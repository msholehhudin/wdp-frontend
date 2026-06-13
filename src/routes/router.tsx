import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import Login from "../features/auth/Login";
import Customer from "../features/customer/Customer";
import Transaction from "../features/transaction/Transaction";
import Dashboard from "../features/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
    ],
  },
]);
