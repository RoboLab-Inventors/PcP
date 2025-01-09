import Drawer from "@mui/material/Drawer";
import "./ResponsiveMenu.css";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

export default function ResponsiveMenu({ open, onClose }) {
  const DrawerList = (
    <Box>
      <div className="menu-list">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>
    </Box>
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0)", // Cambia il colore di sfondo qui
          zIndex: 1500,
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
}

ResponsiveMenu.propTypes = {
  open: PropTypes.bool.isRequired, // 'open' deve essere un booleano e è richiesto
  onClose: PropTypes.func.isRequired, // 'onClose' deve essere una funzione e è richiesto
};
