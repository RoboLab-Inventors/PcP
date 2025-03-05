/**
 * Componente CustomCursor
 *
 * Questo componente crea un cursore personalizzato che segue il movimento del mouse.
 *
 * @returns {JSX.Element} Il componente CustomCursor.
 */
import { useState, useEffect } from "react";
import "./CustomCursor.css";

const CustomCursor = () => {
  // Funzione per determinare se il dispositivo è mobile
  const isMobileDevice = () => {
    // Controlla l'user agent per dispositivi mobili
    const uaCheck =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    // Controlla se il dispositivo supporta il touch
    const touchCheck =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
    // Controlla se il dispositivo ha un puntatore
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
  const [isHoveringIframe, setIsHoveringIframe] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isFading, setIsFading] = useState(false);

  // useEffect per controllare se il dispositivo è mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobileState(isMobileDevice());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect per gestire il movimento del cursore
  useEffect(() => {
    if (isMobileState) return;

    /**
     * Gestisce il movimento del mouse aggiornando la posizione del cursore.
     *
     * @param {MouseEvent} e - L'evento del mouse che contiene le coordinate del cursore.
     */
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsActive(true);
      setIsFading(false);
    };

    /**
     * Gestisce l'evento mouseout.
     * Se il cursore lascia la finestra del browser (e.relatedTarget è null e e.toElement è null),
     * imposta lo stato di fading a true e, dopo un timeout di 500ms, imposta lo stato di attivazione a false.
     *
     * @param {MouseEvent} e - L'evento mouseout.
     */
    const handleMouseOut = (e) => {
      if (!e.relatedTarget && e.toElement === null) {
        setIsFading(true);
        setTimeout(() => setIsActive(false), 500);
      }
    };

    // Aggiunta dei listener per il movimento del cursore e l'uscita dalla finestra
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);

    // Cleanup dei listener
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isMobileState]);

  // Gestione degli elementi hover
  useEffect(() => {
    if (isMobileState) return;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleIframeEnter = () => setIsHoveringIframe(true);
    const handleIframeLeave = () => setIsHoveringIframe(false);

    /**
     * Aggiunge listener di hover agli elementi con le classi specificate.
     * Aggiunge i listener per gli eventi "mouseenter" e "mouseleave" per gestire l'hover.
     * Aggiunge i listener per gli eventi "mouseenter" e "mouseleave" per gestire l'hover su gli iframe.
     *
     * @returns {Function} Una funzione di cleanup che rimuove i listener di hover dagli elementi.
     */
    const addHoverListeners = () => {
      const hoverElements = document.querySelectorAll(
        ".hover-target, a, button, input, label, iframe"
      );
      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        iframe.addEventListener("mouseenter", handleIframeEnter);
        iframe.addEventListener("mouseleave", handleIframeLeave);
      });
      // Cleanup dei listener
      return () => {
        hoverElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter);
          el.removeEventListener("mouseleave", handleMouseLeave);
        });
        iframes.forEach((iframe) => {
          iframe.removeEventListener("mouseenter", handleIframeEnter);
          iframe.removeEventListener("mouseleave", handleIframeLeave);
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
        isFading || isHoveringIframe ? "fading" : ""
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
