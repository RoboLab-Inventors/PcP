/**
 * Componente CarouselComponent
 *
 * Questo componente utilizza il pacchetto `react-responsive-carousel` per creare un carosello di immagini.
 *
 * Proprietà del carosello:
 * - `infiniteLoop`: Abilita il loop infinito delle slide.
 * - `autoPlay`: Abilita la riproduzione automatica delle slide.
 * - `interval`: Imposta l'intervallo di tempo (in millisecondi) tra una slide e l'altra.
 * - `transitionTime`: Imposta il tempo di transizione (in millisecondi) tra una slide e l'altra.
 * - `swipeable`: Abilita lo swipe delle slide.
 * - `centerMode`: Abilita la modalità centrata delle slide.
 * - `centerSlidePercentage`: Imposta la percentuale di larghezza della slide centrale.
 *
 * Ogni slide contiene un'immagine e una didascalia.
 *
 * @component
 * @example
 * return (
 *   <CarouselComponent />
 * )
 */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Controller from "../../../assets/images/Controller1.png";
import Robolablogo from "../../../assets/images/Robolablogo.png";

const CarouselComponent = () => {
  return (
    <Carousel
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
      transitionTime={1000}
      swipeable={true}
      centerMode={true}
      centerSlidePercentage={70}
    >
      <div>
        <img src={Controller} alt="Controller" />
        <p className="legend">Controller</p>
      </div>
      <div>
        <img src={Robolablogo} alt="Robolablogo" />
        <p className="legend">Robolablogo</p>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
