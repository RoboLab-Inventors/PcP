import "./ConfigurationCard.css";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";

function ConfigurationCard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`cardWrapper ${isOpen ? "open" : ""}`}>
      <div className="cardContainer" onClick={toggleDropdown}>
        <div className="titleContainer">
          <Typography>
            Configurazione delle
            palleculopalleprovastronzoprovaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </Typography>
        </div>
        <div className="logoContainer">
          <KeyboardArrowDownIcon
            className={`arrowIcon ${isOpen ? "rotate" : ""}`}
          />
        </div>
      </div>
      {/* Dropdown Section */}
      <div className={`dropdownSection ${isOpen ? "open" : ""}`}>
        <div className="descriptionContainer">
          <Typography variant="body2">
            Here is some extra
            content!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            palleculopalleprovastronzoprovaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaapalle
            palleculopalleprovastronzoprovaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            palleculopalleprovastronzoprovaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </Typography>
        </div>
        <div className="buttonsContainer">
          <DownloadIcon />
          <Typography variant="body2">GinoPaoli</Typography>
        </div>
      </div>
    </div>
  );
}

export default ConfigurationCard;
