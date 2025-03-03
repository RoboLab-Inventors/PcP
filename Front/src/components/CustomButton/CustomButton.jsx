/**
 * Componente CustomButton
 * 
 * @param {Object} props - Proprietà del componente
 * @param {string} props.label - Testo dell'etichetta del pulsante
 * @param {string} [props.labelColor="var(--fontColor)"] - Colore del testo dell'etichetta
 * @param {string} [props.borderColor="var(--secondary-color-main)"] - Colore del bordo del pulsante
 * @param {string} [props.backgroundColor="var(--primary-color-main)"] - Colore di sfondo del pulsante
 * @param {string} [props.bgColor="var(--background-primary)"] - Colore di sfondo dell'elemento di sfondo mobile
 * @param {string} [props.hoverLabelColor="var(--fontColor)"] - Colore del testo dell'etichetta quando il pulsante è in hover
 * @param {function} props.onClick - Funzione da chiamare al click del pulsante
 * 
 * @returns {JSX.Element} - Ritorna un elemento JSX che rappresenta un pulsante personalizzato
 */
import { useState } from "react";
import PropTypes from "prop-types";
import "./CustomButton.css";

const CustomButton = ({ 
  label, 
  labelColor = "var(--fontColor)", 
  borderColor = "var(--secondary-color-main)", 
  backgroundColor = "var(--primary-color-main)", 
  bgColor = "var(--background-primary)", 
  hoverLabelColor = "var(--fontColor)",
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Gestisce il movimento del mouse sull'elemento del pulsante.
   * Sposta l'elemento di sfondo in base alla posizione del cursore.
   *
   * @param {MouseEvent} e - L'evento del mouse.
   */
  const handleMouseMove = (e) => {
    const btn = e.currentTarget; // Elemento su cui è stato effettuato il click
    const bg = btn.querySelector(".bg"); // Elemento di sfondo che si muove
  
    const { clientX, clientY } = e; // Coordinate del cursore
    const rect = btn.getBoundingClientRect(); // Dimensioni dell'elemento
    bg.style.left = `${clientX - rect.left}px`;
    bg.style.top = `${clientY - rect.top}px`;
    bg.style.transform = "translate(-50%, -50%) scale(1)";
  };

  /**
   * Ripristina la scala dell'elemento di sfondo (.bg) all'interno dell'elemento corrente.
   *
   * @param {Event} e - L'evento che ha attivato la funzione.
   */
  const resetScale = (e) => {
    const bg = e.currentTarget.querySelector(".bg");
    bg.style.transform = "translate(-50%, -50%) scale(0)";
  };

  return (
    <a
      className={`btn ${isHovered ? 'hovered' : ''} .hover-target`}
      onMouseMove={handleMouseMove}
      onMouseLeave={(e) => {
        resetScale(e);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      style={{
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      }}
    >
      <span 
        className="label" 
        style={{ 
          color: isHovered ? hoverLabelColor : labelColor,
        }}
      >
        {label}
      </span>
      <span className="bg" style={{ backgroundColor: bgColor }}></span>
    </a>
  );
};

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  labelColor: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  bgColor: PropTypes.string,
  hoverLabelColor: PropTypes.string,
  onClick: PropTypes.func,
};

export default CustomButton;