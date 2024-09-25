import { createBrowserRouter, RouteObject } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import routes from "./routerConfig";
import Home from "../pages/Home";

const routeLayout: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
    ],
  },
];

const router = createBrowserRouter(routeLayout);

export default router;
