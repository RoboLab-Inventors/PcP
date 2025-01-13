import React, { useState, useEffect } from "react";
import "./CustomCursor.css";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(true); // Controlla se il cursore è visibile
  const [isFading, setIsFading] = useState(false); // Controlla l'animazione di scomparsa

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsActive(true); // Rendi visibile il cursore quando il mouse si muove
      setIsFading(false); // Rimuovi l'effetto di scomparsa
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget && e.toElement === null) {
        setIsFading(true); // Attiva l'animazione di scomparsa
        setTimeout(() => setIsActive(false), 500); // Nascondi dopo la durata dell'animazione
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
    };
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
    <div
      className={`custom-cursor ${isActive ? "active" : ""} ${isFading ? "fading" : ""} ${isHovering ? "hovering" : ""}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    ></div>
  );
};

export default CustomCursor;
