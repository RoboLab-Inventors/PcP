import { useState } from "react";
import PropTypes from "prop-types";
import "./CustomButton.css";

const CustomButton = ({ 
  label, 
  labelColor, 
  borderColor, 
  backgroundColor, 
  bgColor, 
  hoverLabelColor 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const btn = e.currentTarget;
    const bg = btn.querySelector(".bg");

    const { pageX, pageY } = e;
    bg.style.left = `${pageX - btn.offsetLeft}px`;
    bg.style.top = `${pageY - btn.offsetTop}px`;
    bg.style.transform = "translate(-50%, -50%) scale(1)";
  };

  const resetScale = (e) => {
    const bg = e.currentTarget.querySelector(".bg");
    bg.style.transform = "translate(-50%, -50%) scale(0)";
  };

  return (
    <a
      className={`btn ${isHovered ? 'hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={(e) => {
        resetScale(e);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      }}
    >
      <span 
        className="label" 
        style={{ 
          color: isHovered ? hoverLabelColor : labelColor,
        }}
      >
        {label}
      </span>
      <span className="bg" style={{ backgroundColor: bgColor }}></span>
    </a>
  );
};

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  labelColor: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  bgColor: PropTypes.string,
  hoverLabelColor: PropTypes.string,
};

CustomButton.defaultProps = {
  labelColor: "var(--fontColor)",
  borderColor: "var(--secondary-color-main)",
  backgroundColor: "var(--primary-color-main)",
  bgColor: "var(--background-primary)",
  hoverLabelColor: "var(--fontColor)",
};

export default CustomButton;