import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./mainStyle.css";
import "./sign.css";
import "./mobileStyle.css";
import "./TabletStyle.css";
import App from "./App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
      <ToastContainer />
    </UserProvider>
  </React.StrictMode>
);
