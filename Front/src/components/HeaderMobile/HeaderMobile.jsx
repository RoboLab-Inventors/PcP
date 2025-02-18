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
      <IconButton ref={burgerRef} onClick={toggleMenu} sx={{ position: "fixed", top: 16, left: 16, color: theme.palette.fontColor.main }}>
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
    </div>
  );
};

export default HeaderMobile;