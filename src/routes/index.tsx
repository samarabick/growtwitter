import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login/index";
import { Home } from "../pages/Home/index";
import { Profile } from "../pages/Profile/index";
import { MainLayout } from "../layouts/MainLayout";
import { Explore } from "../pages/Explore";
import { Followers } from "../pages/Profile/Followers";

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
      {
        path: "/profile/:id/followers",
        element: <Followers type="followers" />,
      },
      {
        path: "/profile/:id/following",
        element: <Followers type="following" />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
    ],
  },
]);
