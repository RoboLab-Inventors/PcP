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
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import "./ChatBot.css";

const ChatInput = ({ input, setInput, sendMessage }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") sendMessage();
  };

  return (
    <Box sx={{ display: "flex", padding: 1 }} className="chatbot-input">
      <input
        className="textfield"
        type="text"
        placeholder="Scrivi un messaggio..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className="sendButton" onClick={sendMessage} variant="contained" sx={{ marginLeft: 1 }}>
        <SendIcon />
      </button>
    </Box>
  );
};

export default ChatInput;


