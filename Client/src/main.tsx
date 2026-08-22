import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./router";

import { TransactionsProvider } from "./components/transactions/TransactionsContext";
import { ThemeProvider } from "./context/ThemeContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <TransactionsProvider>
        <RouterProvider router={router} />
      </TransactionsProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
