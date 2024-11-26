import { useState, useEffect, useRef } from "react";
import HeaderButton from "./HeaderButton/HeaderButton";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import "./Header.css";

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollPos = useRef(0); // Use useRef to track last scroll position

  // Function to handle scroll behavior
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > lastScrollPos.current && currentScrollPos > 300) {
      // Scrolling down - hide the header
      setShowHeader(false);
    } else if (currentScrollPos < lastScrollPos.current) {
      // Scrolling up - show the header
      setShowHeader(true);
    }

    // Update the last scroll position
    lastScrollPos.current = currentScrollPos; // Update the ref
  };

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: Remove the event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty array to ensure it runs only once on mount

  return (
    <header className={`header ${showHeader ? "visible" : "hidden"}`}>
      <nav className="navHeader">
        <div className="nav-section">
          <HeaderButton label="Tickets" />
          <HeaderButton label="About" />
        </div>
        <div className="logo-section">
          <HeaderLogo className="logo-image overexposed-logo" />
        </div>
        <div className="nav-section">
          <HeaderButton label="Services" />
          <HeaderButton label="Contact" />
        </div>
      </nav>
    </header>
  );
}

export default Header;
