import React, { useState, useRef } from "react";
import "./AltHeader.css";
import { useEffect } from "react";
import logo from "../../assets/logoHeader.png";
import Avatar from "@mui/material/Avatar";

const AltHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollPos = useRef(0); // Use useRef to track last scroll position

  // Function to handle scroll behavior
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > lastScrollPos.current && currentScrollPos > 300) {
      // Scrolling down - hide the header
      setShowHeader(false);
    } else if (currentScrollPos < lastScrollPos.current) {
      // Scrolling up - show the header
      setShowHeader(true);
    }

    // Update the last scroll position
    lastScrollPos.current = currentScrollPos; // Update the ref
  };

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: Remove the event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty array to ensure it runs only once on mount

  /*---------------------------------------------------------------------------------*/

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
  const translateXValue =
    (hoveredTab !== null ? hoveredTab : getCheckedTabIndex()) * 100;

  return (
    <div className={`container ${showHeader ? "visible" : "hidden"}`}>
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
            transform: `translateX(${translateXValue}%)`,
          }}
        ></span>
      </div>
      <div className="avatar">
        <Avatar />
      </div>
    </div>
  );
};

export default AltHeader;
