import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Clear localStorage on app start
localStorage.clear();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
