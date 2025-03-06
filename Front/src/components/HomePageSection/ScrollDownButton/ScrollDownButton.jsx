/**
 * Componente ScrollDownButton
 * 
 * Questo componente rende un pulsante che, quando cliccato, scorre la pagina verso il basso fino all'altezza della finestra.
 * 
 * @component
 * @example
 * return (
 *   <ScrollDownButton />
 * )
 * 
 * Funzioni:
 * - handleScroll: Funzione che gestisce l'evento di click sul pulsante e scorre la pagina verso il basso.
 * 
 * @returns {JSX.Element} Il pulsante di scorrimento verso il basso.
 */
import "./ScrollDownButton.css";

const ScrollDownButton = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <>
      <button className="button" onClick={handleScroll}>
        <svg className="svgIcon" viewBox="0 0 384 512">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </button>
    </>
  );
};

export default ScrollDownButton;
