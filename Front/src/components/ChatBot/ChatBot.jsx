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
import { useState, useEffect, useRef } from "react"; // Importa hook di React
import useMediaQuery from "@mui/material/useMediaQuery"; // Importa hook per media queries
import ChatToggleButton from "./ChatToggleButton"; // Importa il pulsante per aprire/chiudere la chat
import ChatWindow from "./ChatWindow"; // Importa la finestra della chat
import sendMessageToBot from "./CharWithOolama"; // Importa la funzione per inviare il messaggio al bot
import { BASE_URL } from "../../constants"; // Importa URL di base per le API

const ChatBot = () => {
  const [open, setOpen] = useState(false); // Stato per controllare se la chat è aperta o chiusa
  const [messages, setMessages] = useState([]); // Stato per memorizzare i messaggi della chat
  const [input, setInput] = useState(""); // Stato per memorizzare il messaggio di input dell'utente
  const isMobile = useMediaQuery("(max-width: 768px)"); // Verifica se il dispositivo è mobile
  const messagesEndRef = useRef(null); // Riferimento per scrollare fino in fondo ai messaggi

  const toggleChat = () => setOpen(!open); // Funzione per aprire/chiudere la chat

  /**
   * Invia i dati del messaggio dell'utente al server per l'archiviazione.
   */
  const insertData = async (input) => {
    try {
      const response = await fetch(`${BASE_URL}/insertChatResult`, {
        method: "POST", // Metodo POST per inviare i dati
        headers: {
          "Content-Type": "application/json", // Tipo di contenuto JSON
        },
        body: JSON.stringify({
          message: input, // Messaggio dell'utente
          email: localStorage.getItem("email"), // Recupera l'email dell'utente dal localStorage
        }),
      });
    } catch (error) {
      console.log("Error:", error); // Stampa eventuali errori nel log
    }
  };

  /**
   * Funzione per inviare il messaggio dell'utente al bot e aggiornare i messaggi.
   * Se non c'è risposta, viene mostrato un messaggio di errore.
   */
  const sendMessage = async () => {
    if (!input.trim()) {
      // Se l'input è vuoto, esce dalla funzione
      console.log("Input vuoto, esco dalla funzione");
      return;
    }
    /**
     * @param {string} userInput - Il messaggio dell'utente da inviare al bot.
     * @returns {Promise<string>} - La risposta del bot.
     * @throws {Error} - Se c'è un errore durante la richiesta.
     */
    insertData(input); // Salva il messaggio dell'utente
    const newMessages = [...messages, { text: input, sender: "user" }]; // Aggiungi il messaggio dell'utente alla lista dei messaggi
    setMessages(newMessages); // Aggiorna lo stato dei messaggi
    setInput(""); // Resetta l'input

    try {
      const response = await sendMessageToBot(input); // Invia il messaggio al bot

      if (response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response, sender: "bot" },
        ]); // Aggiungi la risposta del bot
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Nessuna risposta dal bot", sender: "bot" },
        ]); // Risposta vuota
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Errore nella risposta del server", sender: "bot" }, // Messaggio di errore
      ]);
    }
  };

  useEffect(() => {
    /**
     * Scorre automaticamente fino alla fine dei messaggi con un'animazione fluida.
     */
    const scrollToBottom = () => {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Scorre fino all'elemento di fine
      }, 100); // Attende 100ms prima di eseguire lo scroll
    };

    scrollToBottom(); // Chiama la funzione per scorrere automaticamente
  }, [messages]); // Eseguito ogni volta che i messaggi cambiano

  return (
    <>
      {!open || !isMobile ? (
        <ChatToggleButton open={open} toggleChat={toggleChat} /> // Mostra il pulsante per aprire/chiudere la chat
      ) : null}
      {open && (
        <ChatWindow
          messages={messages} // Passa i messaggi alla finestra della chat
          input={input} // Passa l'input alla finestra della chat
          setInput={setInput} // Passa la funzione per aggiornare l'input
          sendMessage={sendMessage} // Passa la funzione per inviare il messaggio
          toggleChat={toggleChat} // Passa la funzione per chiudere la chat
          messagesEndRef={messagesEndRef} // Passa il riferimento per lo scroll
          isMobile={isMobile} // Passa se il dispositivo è mobile
          PaperProps={{
            sx: {
              transition: "transform 0.3s ease-in-out", // Aggiunge un'animazione al componente Paper
            },
          }}
        />
      )}
    </>
  );
};

export default ChatBot; // Esporta il componente ChatBot
