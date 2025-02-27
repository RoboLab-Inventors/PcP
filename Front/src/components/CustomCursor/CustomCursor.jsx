import React, { useState, useEffect } from "react";
import "./CustomCursor.css";

const CustomCursor = () => {
<<<<<<< HEAD
  const isMobileDevice = () => {
    const uaCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const touchCheck =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
    const pointerCheck =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;
    
    // Richiedo almeno 2 controlli positivi
    const checks = [uaCheck, touchCheck, pointerCheck];
    return checks.filter(Boolean).length >= 2;
  };

  const [isMobileState, setIsMobileState] = useState(isMobileDevice());
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isFading, setIsFading] = useState(false);

  // Ascolta il resize per aggiornare il rilevamento del dispositivo mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobileState(isMobileDevice());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileState) return;
    
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsActive(true);
      setIsFading(false);
=======
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(true); // Controlla se il cursore è visibile
  const [isFading, setIsFading] = useState(false); // Controlla l'animazione di scomparsa

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsActive(true); // Rendi visibile il cursore quando il mouse si muove
      setIsFading(false); // Rimuovi l'effetto di scomparsa
>>>>>>> 0b27615a0e437445f659d75e5f87bb954c3ab230
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget && e.toElement === null) {
<<<<<<< HEAD
        setIsFading(true);
        setTimeout(() => setIsActive(false), 500);
=======
        setIsFading(true); // Attiva l'animazione di scomparsa
        setTimeout(() => setIsActive(false), 500); // Nascondi dopo la durata dell'animazione
>>>>>>> 0b27615a0e437445f659d75e5f87bb954c3ab230
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
    };
<<<<<<< HEAD
  }, [isMobileState]);

  // Gestione degli elementi hover
  useEffect(() => {
    if (isMobileState) return;
  
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
  
    const addHoverListeners = () => {
      const hoverElements = document.querySelectorAll(".hover-target, a, button, input, label");
      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
      return () => {
        hoverElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter);
          el.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    };
  
    const cleanup = addHoverListeners();
  
    const observer = new MutationObserver(() => {
      cleanup(); // Rimuovi vecchi listener
      addHoverListeners(); // Aggiungi nuovi listener
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  
    return () => {
      cleanup();
      observer.disconnect();
    };
  }, [isMobileState]);

  return (
    <div
      className={`custom-cursor ${isActive ? "active" : ""} ${
        isFading ? "fading" : ""
      } ${isHovering ? "hovering" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        display: isMobileState ? "none" : "block",
      }}
    ></div>
=======
  }, []);

  useEffect(() => {
    const hoverElements = document.querySelectorAll(".hover-target, a, button, input");
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {isActive && (
        <div
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          className={`cursor-dot ${isFading ? "cursor-hidden" : ""} ${
            isHovering ? "cursor-hover" : ""
          }`}
        />
      )}
    </>
>>>>>>> 0b27615a0e437445f659d75e5f87bb954c3ab230
  );
};

export default CustomCursor;
<<<<<<< HEAD

=======
>>>>>>> 0b27615a0e437445f659d75e5f87bb954c3ab230
