import React from "react";
import ReactDOM from "react-dom/client";
import App from "./AppWithUpdates";
import "./index.css";
import "./inspection-page-refinements.css";
import "./inspection-page-refinements.js";

// Inspection-page refinements are loaded globally so service-detail updates remain consistent during SPA navigation.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
