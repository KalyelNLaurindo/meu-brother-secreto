import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SorteioProvider } from "./context/SorteioContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SorteioProvider>
      <App />
    </SorteioProvider>
  </React.StrictMode>
);
