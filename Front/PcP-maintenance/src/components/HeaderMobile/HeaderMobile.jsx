import { useState, useRef } from "react";
import "./HeaderMobile.css";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const HeaderMobile = () => {
  const burgerRef = useRef(null); // Create a ref for the burger icon
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log("toggleMenu");
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="header-mobile">
      <div className="burger">
        <label className="burger" onClick={toggleMenu} htmlFor="burger">
          <input
            type="checkbox"
            id="burger"
            style={{ display: "none" }}
            checked={isOpen} // Bind the checkbox to the state
            onChange={toggleMenu} // Toggle the menu on change
          ></input>
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={isOpen ? burgerRef.current : null} // Use the ref as anchorEl
        open={isOpen}
        sx={{ marginTop: "40px" }}
        onClose={toggleMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top", // Position the menu below the burger
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top", // Ensure the menu opens downwards
          horizontal: "left",
        }}
      >
        <MenuItem onClick={toggleMenu}>Home</MenuItem>
        <MenuItem onClick={toggleMenu}>Tool</MenuItem>
        <MenuItem onClick={toggleMenu}>Community</MenuItem>
        <MenuItem onClick={toggleMenu}>Lezioni</MenuItem>
        <MenuItem onClick={toggleMenu}>About Us</MenuItem>
      </Menu>
      <div className="avatar">
        <Avatar />
      </div>
    </div>
  );
};

export default HeaderMobile;
