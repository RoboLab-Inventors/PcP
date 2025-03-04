/**
 * Componente CardComponent che visualizza un'immagine di copertina e un'immagine di un personaggio.
 * Utilizza IntersectionObserver per aggiungere una classe CSS quando il componente è visibile nella viewport.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {string} props.coverImage - L'URL dell'immagine di copertina.
 * @param {string} props.characterImage - L'URL dell'immagine del personaggio.
 * @param {Function} [props.onVisible] - Funzione callback opzionale che viene chiamata quando il componente diventa visibile.
 *
 * @returns {JSX.Element} Il componente CardComponent.
 */
import { useEffect, useRef } from "react";
import "./CardComponent.css";

import PropTypes from "prop-types";

const CardComponent = ({ coverImage, characterImage, onVisible }) => {
  const cardRef = useRef(null);

  // Aggiunge una classe CSS quando il componente è visibile nella viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (cardRef.current) {
            cardRef.current.classList.add("visible");
            if (onVisible) onVisible();
          }
        } else {
          if (cardRef.current) {
            cardRef.current.classList.remove("visible");
          }
        }
      },
      { threshold: 0.6 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <div className="card-container">
      <div className="card" ref={cardRef}>
        <div className="wrapper">
          <img src={coverImage} alt="cover" className="cover-image" />
        </div>
        <img src={characterImage} alt="character" className="character" />
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  coverImage: PropTypes.string.isRequired,
  characterImage: PropTypes.string.isRequired,
  onVisible: PropTypes.func,
};

export default CardComponent;
