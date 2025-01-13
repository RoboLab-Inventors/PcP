import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import "./HeaderMobile.css";

const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const burgerRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    toggleMenu();
  };

  return (
    <div className="header-mobile">
      <div className="burger" ref={burgerRef} onClick={toggleMenu}>
        <label>
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={isOpen ? burgerRef.current : null}
        open={isOpen}
        sx={{ marginTop: "40px" }}
        onClose={toggleMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem key="home" onClick={() => handleMenuItemClick("/")}>Home</MenuItem>
        <MenuItem key="tool" onClick={() => handleMenuItemClick("/Tool")}>Tool</MenuItem>
        <MenuItem key="community" onClick={() => handleMenuItemClick("/Community")}>Community</MenuItem>
        <MenuItem key="lessons" onClick={() => handleMenuItemClick("/Lessons")}>Lezioni</MenuItem>
        <MenuItem key="about-us" onClick={() => handleMenuItemClick("/AboutUs")}>About Us</MenuItem>
      </Menu>
      <div className="avatar">
        <Avatar />
      </div>
    </div>
  );
};

export default HeaderMobile;