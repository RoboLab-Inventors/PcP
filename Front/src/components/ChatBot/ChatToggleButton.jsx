/**
 * Componente per il pulsante di attivazione/disattivazione della chat.
 *
 * @component
 * @param {Object} props - Le proprietà del componente.
 * @param {Function} props.toggleChat - Funzione chiamata quando il pulsante viene cliccato per attivare/disattivare la chat.
 *
 * @example
 * <ChatToggleButton toggleChat={handleToggleChat} />
 */
import "./ChatBot.css"; // Importa i file di stile CSS per il componente
import IconButton from "@mui/material/IconButton"; // Importa il componente IconButton da Material-UI
import ChatIcon from "@mui/icons-material/Chat"; // Importa l'icona della chat da Material-UI
import theme from "../../utils/theme"; // Importa il tema personalizzato
import PropTypes from "prop-types"; // Importa PropTypes per la validazione delle proprietà

// Componente ChatToggleButton che mostra un pulsante per attivare o disattivare la chat
const ChatToggleButton = ({ toggleChat }) => (
  <IconButton
    className="chatToggleButton" // Classe CSS per lo stile del pulsante
    onClick={toggleChat} // Funzione chiamata quando il pulsante viene cliccato
    sx={{
      position: "fixed", // Posizione fissa in basso a destra
      bottom: 16, // Spaziatura dal basso
      right: 16, // Spaziatura dalla destra
      backgroundColor: theme.palette.primary.secondary, // Colore di sfondo personalizzato
      color: theme.palette.secondary.secondary, // Colore dell'icona personalizzato
      "&:hover": { backgroundColor: theme.palette.secondary.main }, // Colore di sfondo quando il pulsante viene hoverato
    }}
  >
    <ChatIcon /> {/* Icona della chat */}
  </IconButton>
);

// Validazione delle proprietà con PropTypes
ChatToggleButton.propTypes = {
  toggleChat: PropTypes.func.isRequired, // La proprietà toggleChat deve essere una funzione
};

export default ChatToggleButton; // Esporta il componente ChatToggleButton
