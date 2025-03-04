import "./ProfileViewer.css";
import CustomButton from "../customButton/CustomButton";
import ProfileInfo from "../profileInfo/ProfileInfo";
import ConfigurationsList from "../../components/configurationsList/ConfigurationsList";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

// Hook personalizzato per determinare se il dispositivo è mobile
const useIsMobile = () => {
  // Media query per dimensioni della finestra
  const mediaQueryMobile = useMediaQuery({ maxWidth: 768 });
  const [isMobile, setIsMobile] = useState(mediaQueryMobile);

  useEffect(() => {
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

const ProfileViewer = () => {
  const [showConfigurations, setShowConfigurations] = useState(false);
  const [animate, setAnimate] = useState(false);
  const isMobile = useIsMobile();

  const handleButtonClick = () => {
    if (showConfigurations) {
      setAnimate(true);
      setTimeout(() => {
        setShowConfigurations(false);
        setAnimate(false);
      }, 500); // Duration of the animation
    } else {
      setShowConfigurations(true);
    }
  };

  return (
    <>
      {isMobile ? (
        <div className="profileViewerContainer">
          <div className="showConfigurationsButton">
            <CustomButton
              onClick={handleButtonClick}
              label={`${
                showConfigurations
                  ? "Nascondi Configurazioni"
                  : "Mostra Configurazioni"
              }`}
            />
          </div>

          {showConfigurations && (
            <div
              className={`configurationsList ${
                animate ? "animateToLeft" : "animateFromLeft"
              }`}
            >
              <ConfigurationsList />
            </div>
          )}
          <div className="profileInfo">
            <ProfileInfo />
          </div>
        </div>
      ) : (
        <div className="profileViewerContainer">
          <div className="configurationsList">
            <ConfigurationsList />
          </div>
          <div className="profileInfo">
            <ProfileInfo />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileViewer;
