import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./lib/router.tsx";
import MainLayout from "./components/MainLayout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainLayout>
      <RouterProvider router={router} />
    </MainLayout>
  </React.StrictMode>
);
