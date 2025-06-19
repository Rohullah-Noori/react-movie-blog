import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppV4 from "./AppV4.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>{<AppV4 />}</StrictMode>
);
