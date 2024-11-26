import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import RoutesPath from './RoutesPath/RoutesPath.jsx';
import CustomCursor from './components/CustomCursor/CustomCursor.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import backgroundVideo from './assets/backgroundVideo.mp4';
import './main.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#650000',
    },
    secondary: {
      main: '#490000',
    },
    fontColor: {
      main: '#f3e8ee',
    },
    background: {
      primary: '#0f0606',
      secondary: '#200b0b',
    },
  },
});

// Dynamically set CSS variables on the root
const setCSSVariables = (theme) => {
  const root = document.documentElement;
  root.style.setProperty('--primary-color-main', theme.palette.primary.main);
  root.style.setProperty('--secondary-color-main', theme.palette.secondary.main);
  root.style.setProperty('--fontColor', theme.palette.fontColor.main);
  root.style.setProperty('--background-primary', theme.palette.background.primary);
  root.style.setProperty('--background-secondary', theme.palette.background.secondary);
};

setCSSVariables(theme);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <video 
      className="background-video" 
      autoPlay 
      loop 
      muted 
      playsInline
    >
      <source src={backgroundVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <CustomCursor />
    <BrowserRouter future={{ v7_startTransition: true,v7_relativeSplatPath: true }}>
      <ThemeProvider theme={theme}>
        <RoutesPath />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
