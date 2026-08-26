import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login/index";
import { Home } from "../pages/Home/index";
import { Profile } from "../pages/Profile/index";
import { MainLayout } from "../layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
]);
