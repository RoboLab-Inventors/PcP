import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import '../main.css';

const getCssVariable = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const palette = {
    primary: { main: getCssVariable('--primary-color-main'), secondary: getCssVariable('--primary-color-secondary'), },
    secondary: { main: getCssVariable('--secondary-color-main'), secondary: getCssVariable('--secondary-color-secondary'), },
    fontColor: { main: getCssVariable('--fontColor-main'), hovered: getCssVariable('--fontColor-hovered')},
    background: { primary: getCssVariable('--background-primary'), secondary: getCssVariable('--background-secondary'), },
  };
  
  const heading = {
    fontFamily: "GT-Alpina",
    fontWeight: 500,
    "@media (max-width:600px)": {
      fontWeight: "normal",
    },
  };
  const typography = {
    fontFamily: "SpaceGrotesk",
    h1: heading, h2: heading, h3: heading,
  };
  
  const theme = responsiveFontSizes(
    createTheme({
      palette,
      typography,
    })
  );

export default theme;