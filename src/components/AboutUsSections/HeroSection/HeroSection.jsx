import React from "react";
import "./HeroSection.css";
import Typography from "@mui/material/Typography";
import CustomButton from "../../CustomButton/CustomButton";

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
      <CustomButton label="Scopri di più"/>
    </div>
  );
};

export default HeroSection;
