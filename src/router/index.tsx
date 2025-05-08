import {
  createBrowserRouter,
  redirect,
  type RouteObject,
} from "react-router-dom";

import { lazy } from "react";

const App = lazy(() => import("../App"));
const Login = lazy(() => import("../views/login"));
const HomePage = lazy(() => import("../views/home"));
const ProfilePage = lazy(() => import("../views/profile"));
const HistoryPage = lazy(() => import("../views/history"));
const JsonPage = lazy(() => import("../views/dummyJson"));

export const route: RouteObject[] = [
  {
    element: <App />,
    loader: async () => {
      const token = localStorage.token;
      if (!token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/profile",
        handle: { label: "Profile" },
        element: <ProfilePage />,
      },
      {
        path: "/",
        handle: { label: "Home" },
        element: <HomePage />,
      },
      {
        path: "/history",
        handle: { label: "History" },
        element: <HistoryPage />,
      },
      {
        path: "/json",
        handle: { label: "Json" },
        element: <JsonPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: async () => {
      const token = localStorage.token;
      if (token) {
        return redirect("/");
      }
      return null;
    },
  },
];

export default createBrowserRouter(route);
