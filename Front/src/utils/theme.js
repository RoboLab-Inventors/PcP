// Importa le utility di Material-UI per la creazione e gestione dei temi
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
// Importa il file CSS principale che contiene le variabili CSS custom
import "../main.css";

// Funzione helper per recuperare i valori delle variabili CSS dal root document
const getCssVariable = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// Definizione della palette dei colori dell'applicazione
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
  dark: {
    main: getCssVariable("--darkgrey"),
    secondary: getCssVariable("--grey"),
  },
};

// Stili per i titoli (headings)
const heading = {
  fontFamily: "GT-Alpina",
  fontWeight: 500,
  "@media (max-width:600px)": {
    fontWeight: "normal",
  },
};

// Stili per il testo del corpo
const body = {
  fontFamily: "SpaceGrotesk",
  fontWeight: 1000,
  "@media (max-width:600px)": {
    fontWeight: "normal",
  },
};

// Configurazione generale della tipografia
const typography = {
  fontFamily: "SpaceGrotesk",
  h1: heading,
  h2: heading,
  h3: heading,
  body1: body,
  body2: body,
  p: body,
};

// Creazione del tema con supporto responsive per i font
const theme = responsiveFontSizes(
  createTheme({
    palette,
    typography,
  })
);

export default theme;
