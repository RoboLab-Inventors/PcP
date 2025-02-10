import "./ProfileConfigurationCard.css";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Download, EditNote, Publish, Delete } from "@mui/icons-material";

import { useState } from "react";

const ProfileConfigurationCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`profileCardWrapper ${isOpen ? "open" : ""}`}>
      <div className="profileCardContainer" onClick={toggleDropdown}>
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
        <div className="profileButtonsContainer">
          <button className="reactionButton">
            <span className="tooltip">Modifica</span>
            <EditNote />
          </button>
          <button className="reactionButton">
            <span className="tooltip">Scarica</span>
            <Download className="icon" />
          </button>
          <button className="reactionButton">
            <span className="tooltip">Pubblica</span>
            <Publish className="icon" />
          </button>
          <button className="reactionButton">
            <span className="tooltip">Elimina</span>
            <Delete className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileConfigurationCard;
