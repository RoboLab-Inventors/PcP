/**
 * Componente HeroSection.
 * 
 * Questo componente rappresenta una sezione "Hero" della pagina "Chi siamo".
 * Include una descrizione e un pulsante personalizzato che, al click, scorre
 * la pagina fino a un elemento con la classe "left-div".
 * 
 * @component
 * @example
 * return (
 *   <HeroSection />
 * )
 * 
 * @returns {JSX.Element} La sezione Hero con descrizione e pulsante.
 */
import React from "react";
import "./HeroSection.css";
import Typography from "@mui/material/Typography";
import CustomButton from "../../CustomButton/CustomButton";

/**
 * Gestisce il click del pulsante per scorrere alla vista dell'elemento con la classe 'left-div'.
 * Se l'elemento non viene trovato, viene stampato un messaggio di errore nella console.
 */
const handleClick = () => {
  const leftDiv = document.querySelector('.left-div');
  if (leftDiv) {
    leftDiv.scrollIntoView({ behavior: "smooth" });
  } else {
    console.log('Elemento .left-div non trovato al click del pulsante');
  }
};

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-section-description">
        <Typography variant="h1">Chi siamo</Typography>
        <Typography variant="h4">
          In questa sezione, ti raccontiamo chi siamo, come è nato il nostro
          tool, e come funziona. Scoprirai chi ha dato vita a questa
          innovazione, il suo scopo e le tecnologie che lo rendono unico. La
          nostra storia unisce passione, competenza e visione per offrire
          soluzioni immediate nel campo della robotica.
        </Typography>
      </div>
      <CustomButton label="Scopri di più" onClick={handleClick} />
    </div>
  );
};

export default HeroSection;