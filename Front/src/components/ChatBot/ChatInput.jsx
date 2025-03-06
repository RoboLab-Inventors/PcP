/**
 * Componente ChatInput
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {string} props.input - Il valore corrente dell'input.
 * @param {Function} props.setInput - Funzione per aggiornare il valore dell'input.
 * @param {Function} props.sendMessage - Funzione per inviare il messaggio.
 *
 * @returns {JSX.Element} - Il componente ChatInput.
 */
import Box from "@mui/material/Box"; // Importa il componente Box da Material-UI
import SendIcon from "@mui/icons-material/Send"; // Importa l'icona di invio da Material-UI
import "./ChatBot.css"; // Importa i file di stile CSS
import PropTypes from "prop-types"; // Importa PropTypes per la validazione delle proprietà

const ChatInput = ({ input, setInput, sendMessage }) => {
  // Funzione che gestisce l'evento di pressione del tasto Enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") sendMessage(); // Se il tasto premuto è Enter, invia il messaggio
  };

  return (
    <Box sx={{ display: "flex", padding: 1 }} className="chatbot-input">
      <input
        className="textfield"
        type="text"
        placeholder="Scrivi un messaggio..." // Testo di placeholder nell'input
        value={input} // Valore dell'input legato allo stato
        onChange={(e) => setInput(e.target.value)} // Aggiorna lo stato dell'input
        onKeyDown={handleKeyPress} // Gestisce la pressione dei tasti
      />
      <button className="sendButton" onClick={sendMessage}>
        <SendIcon /> {/* Icona di invio */}
      </button>
    </Box>
  );
};

// PropTypes per la validazione delle proprietà del componente
ChatInput.propTypes = {
  input: PropTypes.string.isRequired, // L'input deve essere una stringa
  setInput: PropTypes.func.isRequired, // setInput deve essere una funzione
  sendMessage: PropTypes.func.isRequired, // sendMessage deve essere una funzione
};

export default ChatInput; // Esporta il componente ChatInput
