/**
 * Componente principale dell'applicazione.
 * 
 * Utilizza Vanta.js per creare un effetto di sfondo animato e gestisce il routing dell'applicazione.
 * 
 * @component
 * 
 * @returns {JSX.Element} Il componente App.
 * 
 * @example
 * import React from 'react';
 * import ReactDOM from 'react-dom';
 * import App from './App';
 * 
 * ReactDOM.render(<App />, document.getElementById('root'));
 */
import { useEffect, useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesPath from "./RoutesPath/RoutesPath.jsx";
import CustomCursor from "./components/CustomCursor/CustomCursor.jsx";
import { ThemeProvider } from "@mui/material/styles";
import NET from "vanta/dist/vanta.net.min";
import theme from "./utils/theme"; // Import theme from a separate file

const App = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: false,
          gyroControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xaa0000,
          backgroundColor: 0x2f2f2f,
          points: 18.0,
          maxDistance: 24.0,
          spacing: 13.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <>
      <div className="background" ref={vantaRef}></div>
      <CustomCursor />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ThemeProvider theme={theme}>
          <RoutesPath />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
