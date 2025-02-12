import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RoutesPath from "./RoutesPath/RoutesPath.jsx";
import CustomCursor from "./components/CustomCursor/CustomCursor.jsx";
import { createTheme, ThemeProvider, responsiveFontSizes, } from "@mui/material/styles";

import "./main.css";
import './hooks/smoothscroll.js';

// Define the palette separately
const palette = {
  primary: { main: "#650000", },
  secondary: { main: "#490000", },
  fontColor: { main: "#f3e8ee", },
  background: { primary: "#0f0606", secondary: "#200b0b", },
};

const heading = {
  fontFamily: "GT-Alpina",
  fontWeight: 500,
  "@media (max-width:600px)": {
    fontWeight: "normal",
  },
};
// Define the typography separately
const typography = {
  fontFamily: "SpaceGrotesk",
  h1: heading, h2: heading, h3: heading, h4: heading, h5: heading, h6: heading,
};

// Create the theme by merging the palette and typography
const theme = responsiveFontSizes(
  createTheme({
    palette,
    typography,
  })
);

// Dynamically set CSS variables on the root
const setCSSVariables = (theme) => {
  const root = document.documentElement;
  root.style.setProperty("--primary-color-main", theme.palette.primary.main);
  root.style.setProperty("--secondary-color-main", theme.palette.secondary.main);
  root.style.setProperty("--fontColor", theme.palette.fontColor.main);
  root.style.setProperty("--background-primary", theme.palette.background.primary);
  root.style.setProperty("--background-secondary", theme.palette.background.secondary);
};

setCSSVariables(theme);

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
