/**
 * Componente ChatBot.
 * 
 * Questo componente rappresenta un chatbot che può essere aperto e chiuso tramite un pulsante di toggle.
 * Utilizza la funzione `sendMessageToBot` per inviare messaggi al bot e gestire le risposte.
 * 
 * @component
 * 
 * @returns {JSX.Element} Il componente ChatBot.
 * 
 * @example
 * return <ChatBot />;
 * 
 * @typedef {Object} Message
 * @property {string} text - Il testo del messaggio.
 * @property {string} sender - Il mittente del messaggio ("user" o "bot").
 * 
 * @typedef {Object} PaperProps
 * @property {Object} sx - Proprietà di stile per il componente Paper.
 * 
 * @typedef {Object} ChatWindowProps
 * @property {Message[]} messages - Array di messaggi da visualizzare nella finestra della chat.
 * @property {string} input - Il testo attualmente inserito dall'utente.
 * @property {function} setInput - Funzione per aggiornare il testo dell'input.
 * @property {function} sendMessage - Funzione per inviare un messaggio.
 * @property {function} toggleChat - Funzione per aprire/chiudere la finestra della chat.
 * @property {Object} messagesEndRef - Riferimento all'elemento DOM per lo scroll automatico.
 * @property {boolean} isMobile - Indica se il dispositivo è mobile.
 * @property {PaperProps} PaperProps - Proprietà di stile per il componente Paper.
 */
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import ChatToggleButton from "./ChatToggleButton";
import ChatWindow from "./ChatWindow";
import sendMessageToBot from "./CharWithOolama"; // Importa la funzione sendMessageToBot

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const messagesEndRef = useRef(null);

  const toggleChat = () => setOpen(!open);
  
  /**
   * Invia un messaggio al bot e aggiorna lo stato dei messaggi.
   * 
   * Se l'input è vuoto o contiene solo spazi bianchi, la funzione non fa nulla.
   * Altrimenti, aggiunge il messaggio dell'utente alla lista dei messaggi e invia il messaggio al bot.
   * 
   * Se la risposta del bot è ricevuta con successo, viene aggiunta alla lista dei messaggi.
   * In caso di errore, viene aggiunto un messaggio di errore alla lista dei messaggi.
   * 
   * @async
   * @function sendMessage
   * @returns {Promise<void>} - Una promessa che si risolve quando il messaggio è stato inviato e la risposta è stata gestita.
   */
  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await sendMessageToBot(input); // Utilizza la funzione sendMessageToBot per inviare il messaggio
      setMessages([...newMessages, { text: response, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { text: "Errore nella risposta del server", sender: "bot" }]);
    }
  };

  useEffect(() => {
    /**
     * Scorre automaticamente fino alla fine dei messaggi con un'animazione fluida.
     * Utilizza un timeout di 100 millisecondi per garantire che l'elemento di destinazione sia presente nel DOM.
     */
    const scrollToBottom = () => {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };
    
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <ChatToggleButton open={open} toggleChat={toggleChat} />
      {open && (
        <ChatWindow
          messages={messages}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          toggleChat={toggleChat}
          messagesEndRef={messagesEndRef}
          isMobile={isMobile}
          PaperProps={{
            sx: {
              transition: "transform 0.3s ease-in-out",
            },
          }}
        />
      )}
    </>
  );
};

export default ChatBot;