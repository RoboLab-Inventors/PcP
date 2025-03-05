import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import "../main.css";

const getCssVariable = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const palette = {
  primary: {
    main: getCssVariable("--primary"),
    secondary: getCssVariable("--secondary"),
  },
  secondary: {
    main: getCssVariable("--accent"),
    secondary: getCssVariable("--background"),
  },
  fontColor: {
    main: getCssVariable("--text"),
    hovered: getCssVariable("--background"),
  },
  background: {
    primary: getCssVariable("--background"),
    secondary: getCssVariable("--text"),
  },
};

const heading = {
  fontFamily: "GT-Alpina",
  fontWeight: 500,
  "@media (max-width:600px)": {
    fontWeight: "normal",
  },
};

const body = {
  fontFamily: "SpaceGrotesk",
  fontWeight: 1000,
  "@media (max-width:600px)": {
    fontWeight: "normal",
  },
};

const typography = {
  fontFamily: "SpaceGrotesk",
  h1: heading,
  h2: heading,
  h3: heading,
  body1: body,
  body2: body,
  p: body,
};

const theme = responsiveFontSizes(
  createTheme({
    palette,
    typography,
  })
);

export default theme;
