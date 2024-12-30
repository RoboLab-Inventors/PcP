import React, { useState, useRef } from "react";
import "./AltHeader.css";
import logo from "../../assets/logo.png";

const AltHeader = () => {
  const [hoveredTab, setHoveredTab] = useState(null); // Stato per gestire il tab hoverato
  const tabs = ["Lessons", "Profiler", "Logo", "About Us", "Community"];
  const radioRefs = useRef([]); // Array per memorizzare i riferimenti agli input radio

  const handleHover = (index) => {
    setHoveredTab(index); // Aggiorna lo stato durante l'hover
  };

  const handleMouseLeave = () => {
    setHoveredTab(null); // Reset dello stato al termine dell'hover
  };

  const getCheckedTabIndex = () => {
    // Trova l'indice dell'input radio checked
    for (let i = 0; i < radioRefs.current.length; i++) {
      if (radioRefs.current[i].checked) {
        return i;
      }
    }
    return 2; // Imposta "Logo" come predefinito selezionato (indice 2)
  };

  return (
    <div className="container">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <React.Fragment key={index}>
            <input
              type="radio"
              id={`radio-${index + 1}`}
              name="tabs"
              defaultChecked={index === 2} // Imposta "Logo" come predefinito
              ref={(el) => (radioRefs.current[index] = el)} // Assegna il riferimento
            />
            <label
              className={`tab ${tab === "Logo" ? "logo-tab" : ""}`} // Aggiungi una classe speciale per "Logo"
              htmlFor={`radio-${index + 1}`}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleMouseLeave}
            >
              {tab === "Logo" ? (
                <img
                  src={logo} // Sostituisci con l'URL della tua immagine
                  alt="Logo"
                  className="logo-image"
                />
              ) : (
                tab
              )}
            </label>
          </React.Fragment>
        ))}
        <span
          className="glider"
          style={{
            transform: `translateX(${(hoveredTab !== null ? hoveredTab : getCheckedTabIndex()) * 100}%)`,
          }}
        ></span>
      </div>
    </div>
  );
};

export default AltHeader;
