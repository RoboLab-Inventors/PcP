// Section.jsx
import React, { useState } from "react";
import "./SectionComponent.css";
import CardComponent from "../CardComponent/CardComponent";
import AccordionComponent from "../AccordionComponent/AccordionComponent";
import RoboLabLogo from "../../../assets/images/RoboLabLogo.png";
import RoboLabWall from "../../../assets/images/RoboLabWall1.jpg";
import Controller from "../../../assets/images/Controller1.png";
import ControllerWall from "../../../assets/images/ControllerWall4.jpg";

const Section = () => {
  const [accordionIndex, setAccordionIndex] = useState(-1);

  const handleCardVisible = (index) => {
    setAccordionIndex(index);
  };

  return (
    <div className="grid-container">
      <div className="left-div">
        {[RoboLabWall, ControllerWall].map((image, index) => (
          <CardComponent
            key={index}
            coverImage={image}
            characterImage={index === 0 ? RoboLabLogo : Controller}
            onVisible={() => handleCardVisible(index)}
          />
        ))}
      </div>
      <div className="right-div">
        <AccordionComponent accordionIndex={accordionIndex} />
      </div>
    </div>
  );
};

export default Section;
