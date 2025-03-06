/**
 * Componente ChatWindow.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {Array} props.messages - Array di messaggi da visualizzare nella chat.
 * @param {string} props.input - Testo attualmente inserito dall'utente.
 * @param {Function} props.setInput - Funzione per aggiornare il testo inserito dall'utente.
 * @param {Function} props.sendMessage - Funzione per inviare un messaggio.
 * @param {Function} props.toggleChat - Funzione per aprire/chiudere la finestra della chat.
 * @param {Object} props.messagesEndRef - Riferimento all'elemento DOM per scorrere automaticamente alla fine dei messaggi.
 * @param {boolean} props.isMobile - Indica se il dispositivo è mobile.
 *
 * @returns {JSX.Element} Il componente ChatWindow.
 */
import Box from "@mui/material/Box"; // Importa Box da Material-UI
import Drawer from "@mui/material/Drawer"; // Importa Drawer da Material-UI per la visualizzazione mobile
import Paper from "@mui/material/Paper"; // Importa Paper da Material-UI per la finestra chat desktop
import IconButton from "@mui/material/IconButton"; // Importa IconButton per i pulsanti con icone
import Typography from "@mui/material/Typography"; // Importa Typography per il testo
import CloseIcon from "@mui/icons-material/Close"; // Importa l'icona per la chiusura della chat
import theme from "../../utils/theme"; // Importa il tema personalizzato
import TypingEffect from "../../utils/TypingEffect"; // Effetto di scrittura per i messaggi del bot
import ChatInput from "./ChatInput"; // Importa il componente ChatInput
import "./ChatBot.css"; // Importa i file di stile CSS
import PropTypes from "prop-types"; // Importa PropTypes per la validazione delle proprietà

// Componente ChatWindow che visualizza la finestra della chat con i messaggi
const ChatWindow = ({
  messages,
  input,
  setInput,
  sendMessage,
  toggleChat,
  messagesEndRef,
  isMobile,
}) => {
  // Contenitore della chat con stili dinamici
  const chatContainer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(10px)", // Sfondo sfocato
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Distribuisce spazio tra il titolo e il pulsante di chiusura
          p: 2,
          backgroundColor: "rgba(213, 161, 40, 0.5)", // Colore di sfondo della barra superiore
          backdropFilter: "blur(10px)", // Sfondo sfocato
          boxShadow:
            "var(--accent) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em", // Ombra sotto la barra superiore
        }}
      >
        <Typography variant="h4" sx={{ color: theme.palette.background.main }}>
          NicolAI
        </Typography>
        <IconButton
          onClick={toggleChat} // Funzione per chiudere la chat quando cliccato
          sx={{ color: theme.palette.background.main }}
        >
          <CloseIcon /> {/* Icona di chiusura */}
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, padding: 2, overflowY: "auto" }}>
        {messages.map((msg, index) => {
          const isLastBotMessage =
            msg.sender === "bot" && index === messages.length - 1; // Controlla se è l'ultimo messaggio del bot
          return (
            <Typography
              key={index}
              className="message hover-target"
              sx={{
                backgroundColor:
                  msg.sender === "user"
                    ? theme.palette.primary.secondary
                    : theme.palette.secondary.secondary, // Colore di sfondo in base al mittente
                color:
                  msg.sender === "user"
                    ? theme.palette.background.main
                    : "black", // Colore del testo in base al mittente
                padding: 1,
                borderRadius: 1,
                textAlign: msg.sender === "user" ? "right" : "left", // Allineamento del testo
                marginBottom: 1,
                maxWidth: msg.text.length > 50 ? "70%" : "50%", // Larghezza del messaggio
                marginLeft: msg.sender === "user" ? "auto" : 0,
                marginRight: msg.sender !== "user" ? "auto" : 0,
                wordBreak: "break-word", // Evita che il testo esca dai limiti
              }}
            >
              {isLastBotMessage ? <TypingEffect text={msg.text} /> : msg.text} {/* Effetto di scrittura per l'ultimo messaggio del bot */}
            </Typography>
          );
        })}
        <div className="divRef" ref={messagesEndRef} /> {/* Riferimento per lo scroll automatico */}
      </Box>
      <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} /> {/* Componente di input per i messaggi */}
    </Box>
  );

  // Se il dispositivo è mobile, usa un Drawer per la chat, altrimenti usa un Paper per desktop
  return isMobile ? (
    <Drawer
      anchor="bottom"
      open={true}
      onClose={toggleChat} // Funzione per chiudere il Drawer
      PaperProps={{
        sx: {
          backgroundColor: "transparent",
          backdropFilter: "blur(10px)",
          height: "100%",
        },
      }}
    >
      {chatContainer} {/* Contenuto della chat nel Drawer */}
    </Drawer>
  ) : (
    <Paper
      elevation={3} // Imposta l'ombra del Paper
      sx={{
        position: "fixed",
        bottom: 80,
        right: 16,
        width: "40vw", // Larghezza del Paper
        height: "calc(80vh - 100px)", // Altezza del Paper
        borderRadius: 2,
        overflow: "hidden", // Nasconde gli elementi che escono dai limiti
        backdropFilter: "blur(10px)", // Sfondo sfocato
        backgroundColor: "transparent",
        boxShadow:
          "var(--accent) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em", // Ombra sotto il Paper
      }}
    >
      {chatContainer} {/* Contenuto della chat nel Paper */}
    </Paper>
  );
};

// Validazione delle proprietà tramite PropTypes
ChatWindow.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired, // Il mittente del messaggio (user o bot)
      text: PropTypes.string.isRequired, // Il testo del messaggio
    })
  ).isRequired,
  input: PropTypes.string.isRequired, // Il valore dell'input dell'utente
  setInput: PropTypes.func.isRequired, // Funzione per aggiornare l'input dell'utente
  sendMessage: PropTypes.func.isRequired, // Funzione per inviare il messaggio
  toggleChat: PropTypes.func.isRequired, // Funzione per aprire/chiudere la chat
  messagesEndRef: PropTypes.object.isRequired, // Riferimento per il div che serve a scrollare automaticamente
  isMobile: PropTypes.bool.isRequired, // Indica se il dispositivo è mobile
};

export default ChatWindow; // Esporta il componente ChatWindow
