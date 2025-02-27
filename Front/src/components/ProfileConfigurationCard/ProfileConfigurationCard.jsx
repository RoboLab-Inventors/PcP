import "./ProfileConfigurationCard.css";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Download, EditNote, Publish, Delete } from "@mui/icons-material";
import PopUp from "../PopUp/PopUp";
import { useState } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../constants";
const ProfileConfigurationCard = ({ idConfigurazione, nome, descrizione}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleConfigurationVisibility = () => {
    async function publishConfiguration() {
      const response = await fetch(`${BASE_URL}/shareConfiguration`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email:localStorage.getItem("email"),nome:nome }),
      });
      if(response.status === 200){
        window.location.reload();}
    }
    publishConfiguration();
  }
  //TODO: Aggiornare logica scarica configurazione profilo 
  const handleDownloadConfiguration = () => {
    async function downloadConfiguration() {
      try {
        const response = await fetch(`${BASE_URL}/downloadConfigurationProfile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ email: localStorage.getItem("email"), name: nome }),
        });
  
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${nome}_config.txt`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          console.error("Errore durante il download della configurazione");
        }
      } catch (error) {
        console.error("Errore durante il download della configurazione:", error);
      }
    }
    downloadConfiguration();
  }
  const handleClosePopup = () => {
    async function deleteConfiguration() {
      const response = await fetch(`${BASE_URL}/deleteConfiguration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email:localStorage.getItem("email"),nome:nome }),
      });
      if(response.status === 200){
        window.location.reload();}
    }
    deleteConfiguration();
    setShowDeletePopup(false);
  };

  return (
    <div className={`profileCardWrapper ${isOpen ? "open" : ""}`}>
      <div className="profileCardContainer" onClick={toggleDropdown}>
        <div className="titleContainer">
          <Typography variant="h6">{nome}</Typography>
        </div>
        <div className="logoContainer">
          <KeyboardArrowDownIcon className={`arrowIcon ${isOpen ? "rotate" : ""}`} />
        </div>
      </div>
      <div className={`dropdownSection ${isOpen ? "open" : ""}`}>
        <div className="descriptionContainer">
          <Typography variant="body2">{descrizione}</Typography>
        </div>
        <div className="profileButtonsContainer">
          <div className="reactionButton">
            <span className="profileTooltip">Modifica</span>
            <EditNote />
          </div>
          <div className="reactionButton" onClick={handleDownloadConfiguration}>
            <span className="profileTooltip">Scarica</span>
            <Download />
          </div>
          <div className="reactionButton" onClick={handleConfigurationVisibility}>
            <span className="profileTooltip">Pubblica</span>
            <Publish />
          </div>
          <div className="reactionButton" onClick={handleDeleteClick}>
            <span className="profileTooltip">Elimina</span>
            <Delete />
          </div>
        </div>
      </div>
      {showDeletePopup && (
        <PopUp
          title="Conferma Eliminazione"
          message="Sei sicuro di voler eliminare questa configurazione?"
          onClose={handleClosePopup}
        ></PopUp>
      )}
    </div>
  );
};

ProfileConfigurationCard.propTypes = {
  idConfigurazione: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  descrizione: PropTypes.string.isRequired,
};

export default ProfileConfigurationCard;