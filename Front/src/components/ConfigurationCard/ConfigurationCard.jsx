/**
 * Componente ConfigurationCard
 * 
 * @param {Object} props - Proprietà del componente
 * @param {number} props.idConfigurazione - ID della configurazione
 * @param {string} props.nome - Nome della configurazione
 * @param {string} props.descrizione - Descrizione della configurazione
 * @param {string} props.username - Nome utente che ha caricato la configurazione
 * 
 * @returns {JSX.Element} - Ritorna il componente ConfigurationCard
 */
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DownloadIcon from "@mui/icons-material/Download";
import PropTypes from "prop-types";
import "./ConfigurationCard.css";
import { BASE_URL } from "../../constants";

function ConfigurationCard({ idConfigurazione, nome, descrizione, username }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  
  /**
   * Scarica la configurazione dal server e salva il file localmente.
   * 
   * @async
   * @function downloadConfiguration
   * @returns {Promise<void>} - Una promessa che si risolve quando il download è completato.
   * @throws {Error} - Se si verifica un errore durante il download della configurazione.
   */
  const downloadConfiguration = async () => {
    try {
      const response = await fetch(`${BASE_URL}/downloadConfiguration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ idConfigurazione, nome }),
      });

      if (response.ok) {
        const blob = await response.blob(); // Convert the response to a blob
        const url = window.URL.createObjectURL(blob); // Create a URL for the blob
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
  };

  return (
    <div className={`cardWrapper ${isOpen ? "open" : ""}`}>
      <div className="cardContainer" onClick={toggleDropdown}>
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
        <div className="buttonsContainer">
          <DownloadIcon onClick={downloadConfiguration} />
          <Typography variant="body2">Uploaded By: {username}</Typography>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}

ConfigurationCard.propTypes = {
  idConfigurazione: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  descrizione: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default ConfigurationCard;