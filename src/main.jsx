// Main entry point for the React application
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";

// Create and render the root React component
createRoot(document.getElementById("root")).render(<App />);
