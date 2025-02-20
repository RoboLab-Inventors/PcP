import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import AltHeader from "../AlternativeHeader/AltHeader";
import HeaderMobile from "../HeaderMobile/HeaderMobile";

// Hook personalizzato per determinare se il dispositivo è mobile
const useIsMobile = () => {
  // Media query per dimensioni della finestra
  const mediaQueryMobile = useMediaQuery({ maxWidth: 768 });
  const [isMobile, setIsMobile] = useState(mediaQueryMobile);

  // Funzione che combina più controlli
  const checkMobile = () => {
    // Controllo del puntatore "coarse" (tipico dei dispositivi touch)
    const pointerMobile =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches;

    // Controllo per il supporto agli eventi touch
    const touchCheck =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    // Controllo dello user agent
    const uaCheck =
      typeof navigator !== "undefined" &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    // Combiniamo i controlli: ad esempio, se almeno 2 su 4 sono veri, consideriamo il dispositivo mobile
    const checks = [mediaQueryMobile, pointerMobile, touchCheck, uaCheck];
    const positiveChecks = checks.filter(Boolean).length;

    return positiveChecks >= 2;
  };

  useEffect(() => {
    // Aggiorna lo stato ogni volta che la finestra cambia dimensione (o altri parametri potrebbero cambiare)
    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener("resize", handleResize);
    // Aggiornamento iniziale
    setIsMobile(checkMobile());

    return () => window.removeEventListener("resize", handleResize);
  }, [mediaQueryMobile]);

  return isMobile;
};

const HeaderSwitch = () => {
  const isMobile = useIsMobile();

  return isMobile ? <HeaderMobile /> : <AltHeader />;
};

export default HeaderSwitch;
