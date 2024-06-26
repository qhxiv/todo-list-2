import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "destyle.css";
import "./index.css";

import Root, { loader as rootLoader } from "./routes/root";

import { action as headerAction } from "./components/Header";
import Group, { loader as groupLoader } from "./routes/group";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: headerAction,
    children: [
      {
        path: "groups/:groupId",
        element: <Group />,
        loader: groupLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
