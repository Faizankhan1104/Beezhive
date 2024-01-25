import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./Context/Auth";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>, // Notice the correct placement of </AuthProvider>
  document.getElementById("root")
);