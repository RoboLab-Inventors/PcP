import React, { useState, useEffect } from "react";
import "./CustomCursor.css";

const CustomCursor = () => {
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
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget && e.toElement === null) {
        setIsFading(true);
        setTimeout(() => setIsActive(false), 500);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isMobileState]);

  // Gestione degli elementi hover
  useEffect(() => {
    if (isMobileState) return;
    
    const updateHoverElements = () => {
      const hoverElements = document.querySelectorAll(
        ".hover-target, a, button, input, label"
      );
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
    };

    const observer = new MutationObserver(updateHoverElements);
    observer.observe(document.body, { childList: true, subtree: true });

    // Imposta i listener inizialmente
    const cleanup = updateHoverElements();

    return () => {
      cleanup && cleanup();
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
  );
};

export default CustomCursor;

