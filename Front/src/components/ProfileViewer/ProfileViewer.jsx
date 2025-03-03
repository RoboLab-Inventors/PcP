/**
 * Componente ProfileViewer.
 *
 * Questo componente visualizza le informazioni del profilo e una lista di configurazioni.
 * La visualizzazione cambia in base al dispositivo (mobile o desktop).
 *
 * @component
 * @returns {JSX.Element} Il componente ProfileViewer.
 *
 * @example
 * // Esempio di utilizzo:
 * <ProfileViewer />
 *
 * @description
 * - Se il dispositivo è mobile, mostra un pulsante per alternare la visualizzazione della lista di configurazioni.
 * - Se il dispositivo è desktop, mostra sempre la lista di configurazioni accanto alle informazioni del profilo.
 *
 * @function
 * @name ProfileViewer
 */
import "./ProfileViewer.css";
import CustomButton from "../customButton/CustomButton";
import ProfileInfo from "../profileInfo/ProfileInfo";
import ConfigurationsList from "../../components/configurationsList/ConfigurationsList";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

// Funzione che combina più controlli
/**
 * Verifica se il dispositivo corrente è probabilmente un dispositivo mobile.
 *
 * Questa funzione esegue più controlli per determinare se il dispositivo è mobile:
 * 1. Controlla se il dispositivo ha un puntatore "coarse", tipico dei dispositivi touch.
 * 2. Controlla se il dispositivo supporta eventi touch.
 * 3. Controlla la stringa dello user agent per identificatori comuni dei dispositivi mobili.
 *
 * La funzione combina questi controlli e considera il dispositivo come mobile se almeno due dei tre controlli sono positivi.
 *
 * @returns {boolean} True se il dispositivo è probabilmente un dispositivo mobile, false altrimenti.
 */
const useIsMobile = () => {
  // Media query per dimensioni della finestra
  const mediaQueryMobile = useMediaQuery({ maxWidth: 768 });
  const [isMobile, setIsMobile] = useState(mediaQueryMobile);

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
