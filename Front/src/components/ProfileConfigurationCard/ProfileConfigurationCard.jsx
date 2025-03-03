/**
 * Componente ProfileConfigurationCard
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {number} props.idConfigurazione - L'ID della configurazione.
 * @param {string} props.nome - Il nome della configurazione.
 * @param {string} props.descrizione - La descrizione della configurazione.
 *
 * @returns {JSX.Element} Il componente ProfileConfigurationCard.
 */
import "./ProfileConfigurationCard.css";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Download, EditNote, Publish, Delete } from "@mui/icons-material";
import PopUp from "../PopUp/PopUp";
import { useState } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
const ProfileConfigurationCard = ({ idConfigurazione, nome, descrizione}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  /**
   * Gestisce la visibilità della configurazione.
   * 
   * La funzione interna `publishConfiguration` invia una richiesta PUT al server per condividere la configurazione.
   * Utilizza l'email e il nome memorizzati nel localStorage per creare il corpo della richiesta.
   * Se la risposta del server ha uno stato 200, la pagina viene ricaricata.
   */
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
  /**
   * Funzione per gestire la modifica della configurazione dell'utente.
   * 
   * Questa funzione invia una richiesta POST al server per modificare la configurazione
   * dell'utente. Utilizza il token di autenticazione memorizzato nel localStorage per
   * autorizzare la richiesta. Se la modifica è avvenuta con successo, la nuova configurazione
   * viene salvata nel localStorage e l'utente viene reindirizzato alla pagina '/Tool'.
   * 
   * @function handleModifyConfiguration
   * @async
   * @throws {Error} Se si verifica un errore durante la richiesta o la modifica della configurazione.
   */
  const handleModifyConfiguration = () => {
    const modifyConfiguration = async () => {
      try {
        const response = await fetch(`${BASE_URL}/modifyConfiguration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            nome: nome, // Assicurati che 'nome' sia definito correttamente
            email: localStorage.getItem("email"),
          }),
        });
  
        // Controlla se la risposta è OK
        if (response.ok) {
          const data = await response.json(); // Aggiungi 'await' per risolvere la promessa
          localStorage.setItem("str", data.configurazione); // Salva nel localStorage come stringa JSON
          navigate('/Tool')
        } else {
          console.error("Errore durante la modifica della configurazione:", response.statusText);
        }
      } catch (error) {
        alert("Errore: " + error.message); // Gestione degli errori
      }
    };
  
    modifyConfiguration();
  };
  /**
   * Funzione che gestisce il download della configurazione del profilo.
   * 
   * Questa funzione invia una richiesta POST al server per scaricare la configurazione del profilo
   * dell'utente. Utilizza l'email e il nome dell'utente memorizzati nel localStorage per creare
   * il corpo della richiesta. Se la risposta è positiva, crea un URL per il blob ricevuto e
   * avvia il download del file di configurazione.
   * 
   * @async
   * @function handleDownloadConfiguration
   * @returns {void}
   * @throws {Error} Se si verifica un errore durante il download della configurazione.
   */
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
          <div className="reactionButton" onClick={handleModifyConfiguration}>
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