/**
 * Componente Section che visualizza una griglia con una sezione di carte e una sezione di fisarmoniche.
 * Utilizza vari componenti come CardComponent, AccordionComponent e CarouselComponent.
 *
 * @component
 *
 * @example
 * return (
 *   <Section />
 * )
 *
 * @returns {JSX.Element} Il componente Section.
 *
 * @description
 * Il componente Section gestisce lo stato dell'indice della fisarmonica e utilizza un riferimento per il componente Carousel.
 * Quando una carta diventa visibile, l'indice della fisarmonica viene aggiornato.
 * Utilizza IntersectionObserver per osservare quando il componente Carousel è visibile e aggiorna l'indice della fisarmonica di conseguenza.
 */
import { useState, useEffect, useRef } from "react";
import "./SectionComponent.css";
import CardComponent from "../CardComponent/CardComponent";
import AccordionComponent from "../AccordionComponent/AccordionComponent";
import CarouselComponent from "../Carousel/Carousel";
import RoboLabLogo from "../../../assets/images/RoboLabLogo.png";
import RoboLabWall from "../../../assets/images/RoboLabWall1.jpg";
import Controller from "../../../assets/images/Controller1.png";
import ControllerWall from "../../../assets/images/ControllerWall4.jpg";

const Section = () => {
  const [accordionIndex, setAccordionIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleCardVisible = (index) => {
    setAccordionIndex(index);
  };

  // Scrolla al componente Carousel quando
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.addEventListener("load", () => {
        if (accordionIndex === 2) {
          carouselRef.current.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }, [accordionIndex]);

  // Aggiorna l'indice della fisarmonica quando il componente Carousel è visibile
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAccordionIndex(2);
        }
      },
      { threshold: 0.6 }
    );

    if (carouselRef.current) observer.observe(carouselRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid-container">
      <div className="left-div">
        {[ControllerWall, RoboLabWall].map((image, index) => (
          <CardComponent
            key={index}
            coverImage={image}
            characterImage={index === 0 ? Controller : RoboLabLogo}
            onVisible={() => handleCardVisible(index)}
          />
        ))}
        <div className="carousel-div" ref={carouselRef}>
          <CarouselComponent />
        </div>
      </div>
      <div className="right-div">
        <AccordionComponent accordionIndex={accordionIndex} />
      </div>
    </div>
  );
};

export default Section;
