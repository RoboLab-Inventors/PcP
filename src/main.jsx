import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RoutesPath from "./RoutesPath/RoutesPath.jsx";
import CustomCursor from "./components/CustomCursor/CustomCursor.jsx";
import { ThemeProvider } from "@mui/material/styles";

import "./main.css";
import './utils/SmoothScroll.js';
import theme from './utils/theme.js';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="background"></div>
    <CustomCursor />
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider theme={theme}>
        <RoutesPath />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
