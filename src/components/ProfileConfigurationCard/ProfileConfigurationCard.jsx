import "./ProfileConfigurationCard.css";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Download, EditNote, Publish, Delete } from "@mui/icons-material";

import { useState } from "react";
import PropTypes from "prop-types";

const ProfileConfigurationCard = ({ index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`profileCardWrapper ${isOpen ? "open" : ""}`}>
      <div className="profileCardContainer" onClick={toggleDropdown}>
        <div className="titleContainer">
          <Typography>Configurazione {index}</Typography>
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
            Here is some extra content for configuration {index}.
          </Typography>
        </div>
        <div className="profileButtonsContainer">
          <div className="reactionButton">
            <span className="profileTooltip">Modifica</span>
            <EditNote />
          </div>
          <div className="reactionButton">
            <span className="profileTooltip">Scarica</span>
            <Download />
          </div>
          <div className="reactionButton">
            <span className="profileTooltip">Pubblica</span>
            <Publish />
          </div>
          <div className="reactionButton">
            <span className="profileTooltip">Elimina</span>
            <Delete />
          </div>
        </div>
      </div>
    </div>
  );
};
ProfileConfigurationCard.propTypes = {
  index: PropTypes.number.isRequired,
};

export default ProfileConfigurationCard;
