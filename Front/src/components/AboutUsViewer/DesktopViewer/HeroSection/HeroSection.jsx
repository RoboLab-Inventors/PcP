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
import "./HeroSection.css";
import Typography from "@mui/material/Typography";
import CustomButton from "../../../CustomButton/CustomButton";


/**
 * Gestisce il click per scorrere verso una specifica sezione della pagina.
 * Se l'elemento con la classe 'left-div' è presente, scorre verso di esso.
 * Altrimenti, se l'elemento con la classe 'sections-container' è presente, scorre verso di esso.
 * Se nessuno dei due elementi è trovato, viene loggato un errore nella console.
 */
const handleClick = () => {
  const leftDiv = document.querySelector('.left-div');
  const sectionContainer = document.querySelector('.sections-container');
  if (leftDiv) {
    leftDiv.scrollIntoView({ behavior: "smooth" });
  } else if (sectionContainer) {
    sectionContainer.scrollIntoView({ behavior: "smooth" });
  } else {
    console.error("Elemento non trovato.");
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
