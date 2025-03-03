/**
 * Componente AltHeader.
 * 
 * Questo componente rappresenta un'intestazione alternativa che include una barra di navigazione con tab, un logo e una sezione del profilo.
 * 
 * @component
 * @returns {JSX.Element} Il componente AltHeader.
 * 
 * @example
 * <AltHeader />
 * 
 * @description
 * Il componente utilizza gli hook di React `useState`, `useRef` e `useEffect` per gestire lo stato e gli effetti collaterali.
 * 
 * - `showHeader`: Stato booleano per mostrare o nascondere l'intestazione in base alla posizione di scorrimento.
 * - `lastScrollPos`: Riferimento per memorizzare l'ultima posizione di scorrimento.
 * - `hoveredTab`: Stato per gestire il tab attualmente hoverato.
 * - `radioRefs`: Riferimento per memorizzare gli elementi radio dei tab.
 * 
 * @property {boolean} showHeader - Stato per mostrare o nascondere l'intestazione.
 * @property {function} setShowHeader - Funzione per aggiornare lo stato `showHeader`.
 * @property {object} lastScrollPos - Riferimento per memorizzare l'ultima posizione di scorrimento.
 * @property {function} handleScroll - Funzione per gestire l'evento di scorrimento della finestra.
 * @property {function} useEffect - Hook per aggiungere e rimuovere l'evento di scorrimento.
 * @property {Array<string>} tabs - Array di stringhe che rappresentano i nomi dei tab.
 * @property {function} handleHover - Funzione per gestire l'evento di hover sui tab.
 * @property {function} handleMouseLeave - Funzione per gestire l'evento di uscita dall'hover sui tab.
 * @property {function} getCheckedTabIndex - Funzione per ottenere l'indice del tab selezionato in base al percorso corrente.
 * @property {function} handleTabClick - Funzione per gestire il click sui tab e navigare al percorso corrispondente.
 * @property {number} translateXValue - Valore di trasformazione per spostare il glider in base al tab selezionato o hoverato.
 */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AltHeader.css";
import logo from "../../assets/images/logoHeader.png";
import ProfileHeaderSection from "../ProfileHeaderSection/ProfileHeaderSection";

const AltHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  //const [isLightMode, setIsLightMode] = useState(false);
  const lastScrollPos = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > lastScrollPos.current && currentScrollPos > 300) {
      setShowHeader(false);
    } else if (currentScrollPos < lastScrollPos.current) {
      setShowHeader(true);
    }

    lastScrollPos.current = currentScrollPos;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty array to ensure it runs only once on mount

  const [hoveredTab, setHoveredTab] = useState(null); // Stato per gestire il tab hoverato
  const tabs = ["Lessons", "Profiler", "Logo", "About Us", "Community"];
  const radioRefs = useRef([]);

  const handleHover = (index) => {
    setHoveredTab(index);
  };

  const handleMouseLeave = () => {
    setHoveredTab(null);
  };

  const getCheckedTabIndex = () => {
    const pathToIndex = {
      "/Lessons": 0,
      "/Tool": 1,
      "/": 2,
      "/AboutUs": 3,
      "/Community": 4,
    };
    return pathToIndex[location.pathname] ?? 2;
  };

  const handleTabClick = (index) => {
    const paths = ["/Lessons", "/Tool", "/", "/AboutUs", "/Community"];
    navigate(paths[index]);
  };

  const translateXValue =
    (hoveredTab !== null ? hoveredTab : getCheckedTabIndex()) * 100;

  // const toggleTheme = () => {
  //   setIsLightMode(!isLightMode);
  //   document.documentElement.classList.toggle("light-mode", !isLightMode);
  // };

  return (
    <div className={`container ${showHeader ? "visible" : "hidden"}`}>
      <div className="tabs">
        {tabs.map((tab, index) => (
          <React.Fragment key={index}>
            <input
              type="radio"
              id={`radio-${index + 1}`}
              name="tabs"
              checked={index === getCheckedTabIndex()}
              onChange={() => {}}
              ref={(el) => (radioRefs.current[index] = el)}
              onClick={() => handleTabClick(index)}
            />
            <label
              className={`tab ${tab === "Logo" ? "logo-tab" : ""}`}
              htmlFor={`radio-${index + 1}`}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleMouseLeave}
            >
              {tab === "Logo" ? (
                <div className="logo-container">
                  <img src={logo} alt="Logo" className="logo-image" />
                  <div className="logo-cover"></div>
                </div>
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
      <div className="profile">
        <ProfileHeaderSection />
      </div>
      {/* <button onClick={toggleTheme}>
        {isLightMode ? "Dark Mode" : "Light Mode"}
      </button> */}
    </div>
  );
};

export default AltHeader;
