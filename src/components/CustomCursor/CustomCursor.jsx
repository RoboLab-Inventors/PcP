import { useEffect, useState } from "react";
import "./CustomCursor.css";

const CustomCursor = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");

    const updateCursorPosition = (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    };

    const handleMouseEnter = () => {
      setIsActive(true);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    // Add event listeners for mouse movement
    document.addEventListener("mousemove", updateCursorPosition);

    // Aggiungi event listener per elementi con una classe specifica
    const specialImage = document.querySelector(".logo-image overexposed-logo, .logo-section, .drawer-handle");
    if (specialImage) {
      specialImage.addEventListener("mouseenter", handleMouseEnter);
      specialImage.addEventListener("mouseleave", handleMouseLeave);
    }

    // Add event listeners for links and clickable elements
    const links = document.querySelectorAll("a, button, input");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isActive ? "custom-cursor-active" : ""}`}
    ></div>
  );
};

export default CustomCursor;
