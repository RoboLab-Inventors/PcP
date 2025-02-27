<<<<<<< HEAD
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import "./HeaderMobile.css";

const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const burgerRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 480px)");
  const isMediumScreen = useMediaQuery("(min-width: 481px)");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (path) => {
    setTimeout(() => {
      navigate(path);
    }, 1000);
    setTimeout(() => {
      toggleMenu();
    }, 500);
  };

  return (
    <div>
      <IconButton ref={burgerRef} onClick={toggleMenu} sx={{ position: "fixed", top: 16, left: 16, color: theme.palette.fontColor.main, zIndex: 100 }}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleMenu}
        PaperProps={{
          sx: {
            width: isSmallScreen ? "100vw" : "33vw",
            backgroundColor: "#4900006b",
            backdropFilter: "blur(10px)",
            maxWidth: isSmallScreen ? "100vw" : "300px",
          },
        }}
      >
        {isMediumScreen &&
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <IconButton onClick={toggleMenu} sx={{ color: theme.palette.fontColor.main }}>
              <CloseIcon />
            </IconButton>
          </Box>
        }
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            color: theme.palette.fontColor.main,
          }}
        >
          <div onClick={() => handleMenuItemClick("/")} className="menu-item">Home</div>
          <Divider variant="middle" sx={{ backgroundColor: theme.palette.fontColor.main, opacity: "0.7" }} />
          <div onClick={() => handleMenuItemClick("/Tool")} className="menu-item">Tool</div>
          <Divider variant="middle" sx={{ backgroundColor: theme.palette.fontColor.main, opacity: "0.7" }} />
          <div onClick={() => handleMenuItemClick("/Community")} className="menu-item">Community</div>
          <Divider variant="middle" sx={{ backgroundColor: theme.palette.fontColor.main, opacity: "0.7" }} />
          <div onClick={() => handleMenuItemClick("/Lessons")} className="menu-item">Lezioni</div>
          <Divider variant="middle" sx={{ backgroundColor: theme.palette.fontColor.main, opacity: "0.7" }} />
          <div onClick={() => handleMenuItemClick("/AboutUs")} className="menu-item">About Us</div>
          <Divider variant="middle" sx={{ backgroundColor: theme.palette.fontColor.main, opacity: "0.7" }} />
          <div onClick={() => handleMenuItemClick("/Profile")} className="menu-item">Profilo</div>
          <Divider variant="middle" sx={{ backgroundColor: theme.palette.fontColor.main, opacity: "0.7" }} />
        </Box>
        {isSmallScreen &&
          <Box sx={{ display: "flex", justifyContent: "center", bottom: 2, p: 2 }}>
            <IconButton onClick={toggleMenu} sx={{ color: theme.palette.fontColor.main }}>
              <CloseIcon />
            </IconButton>
          </Box>
        }
      </Drawer>
=======
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
>>>>>>> 0b27615a0e437445f659d75e5f87bb954c3ab230
    </div>
  );
};

<<<<<<< HEAD
export default HeaderMobile;
=======
export default HeaderMobile;
>>>>>>> 0b27615a0e437445f659d75e5f87bb954c3ab230
