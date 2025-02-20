import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Carousel.css';
import Controller from '../../../assets/images/Controller1.png';
import Robolablogo from '../../../assets/images/Robolablogo.png';
import ControllerWall from '../../../assets/images/ControllerWall1.png';

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
      <div>
        <img src={ControllerWall} alt="ControllerWall" />
        <p className="legend">ControllerWall</p>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;