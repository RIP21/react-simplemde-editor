import { createRoot } from "react-dom/client";
import Demo from "./demo/Demo";
import React, { StrictMode } from "react";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <Demo />
  </StrictMode>
);
