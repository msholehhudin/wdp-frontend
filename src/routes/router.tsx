import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import Login from "../features/auth/Login";
import Customer from "../features/customer/Customer";
import Dashboard from "../features/dashboard/Dashboard";
import Transaction from "../features/transaction/Transaction";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "customer", element: <Customer /> },
          { path: "transaction", element: <Transaction /> },
        ],
      },
    ],
  },
]);
