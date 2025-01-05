import React, { useEffect, useRef } from "react";
import "./CardComponent.css";

const CardComponent = ({ coverImage, characterImage, onVisible }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          cardRef.current.classList.add("visible");
          if (onVisible) onVisible();
        } else {
          cardRef.current.classList.remove("visible");
        }
      },
      { threshold: 0.6 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <div className="card" ref={cardRef}>
      <div className="wrapper">
        <img src={coverImage} alt="cover" className="cover-image" />
      </div>
      <img src={characterImage} alt="character" className="character" />
    </div>
  );
};

export default CardComponent;
