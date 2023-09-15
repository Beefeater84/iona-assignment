import React from "react";
import ReactDOM from "react-dom/client";
import "./app/styles/index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/MainPage/Home";
import reportWebVitals from "./reportWebVitals";
import CatByIdPage from "./pages/CatByIdPage/CatByIdPage";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:catId",
    element: <CatByIdPage />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
