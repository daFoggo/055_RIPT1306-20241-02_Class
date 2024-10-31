import { createBrowserRouter, RouteObject } from "react-router-dom";
import routes from "./routerConfig";

import RootLayout from "@/layouts/RootLayout";
import AuthLayout from "@/layouts/AuthLayout";

import Dashboard from "@/pages/Dashboard";
import Register from "@/pages/Register";
import Login from "@/pages/Login";

const routeLayout: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: routes.home,
        element: <Dashboard />,
      },
      {
        path: routes.dashboard,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: routes.register,
        element: <Register />,
      },
      {
        path: routes.login,
        element: <Login />,
      },
    ],
  },
];

const router = createBrowserRouter(routeLayout);

export default router;
