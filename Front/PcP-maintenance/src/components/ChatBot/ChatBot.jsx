import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import ChatToggleButton from "./ChatToggleButton";
import ChatWindow from "./ChatWindow";
import chatApi from "./CharWithRTX"; // Importa la classe chatApi

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const messagesEndRef = useRef(null);

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    const port = 5000; // Specifica la porta del server RTX
    const queueManager = new chatApi(port);

    try {
      const response = await queueManager.sendMessage(input);
      setMessages([...newMessages, { text: response, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { text: "Errore nella risposta del server", sender: "bot" }]);
    }
  };

  useEffect(() => {
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