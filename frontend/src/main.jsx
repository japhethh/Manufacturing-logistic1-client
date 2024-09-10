// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import UserContextProvider from "./context/userContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>
);
