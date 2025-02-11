import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../utils/theme";
import TypingEffect from "../../utils/TypingEffect";
import ChatInput from "./ChatInput";
import "./ChatBot.css";

const ChatWindow = ({ messages, input, setInput, sendMessage, toggleChat, messagesEndRef, isMobile }) => {
  const chatContainer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(10px)",
        backgroundColor: "transparent",
      }}
    >
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        p: 2, 
        backgroundColor: "rgba(213, 161, 40, 0.5)", 
        backdropFilter: "blur(10px)", 
        boxShadow: 'var(--primary-color-secondary) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em' }}>
        <Typography variant="h4" sx={{ color: theme.palette.background.main }}>NicolasAI</Typography>
        <IconButton onClick={toggleChat} sx={{ color: theme.palette.background.main }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ flex: 1, padding: 2, overflowY: "auto" }}>
        {messages.map((msg, index) => {
          const isLastBotMessage = msg.sender === "bot" && index === messages.length - 1;
          return (
            <Typography
              key={index}
              className="message hover-target"
              sx={{
                backgroundColor: msg.sender === "user" ? theme.palette.primary.secondary : theme.palette.secondary.secondary,
                color: msg.sender === "user" ? theme.palette.background.main : "black",
                padding: 1,
                borderRadius: 1,
                textAlign: msg.sender === "user" ? "right" : "left",
                marginBottom: 1,
                maxWidth: msg.text.length > 50 ? "70%" : "50%",
                marginLeft: msg.sender === "user" ? "auto" : 0,
                marginRight: msg.sender !== "user" ? "auto" : 0,
                wordBreak: "break-word",
              }}
            >
              {isLastBotMessage ? <TypingEffect text={msg.text} /> : msg.text}
            </Typography>
          );
        })}
        <div className="divRef" ref={messagesEndRef} />
      </Box>
      <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
    </Box>
  );

  return isMobile ? (
    <Drawer anchor="bottom" open={true} onClose={toggleChat} 
    PaperProps={{ sx: { 
      backgroundColor: "transparent",
       backdropFilter: "blur(10px)", 
       height: "100%" 
       } }}>
      {chatContainer}
    </Drawer>
  ) : (
    <Paper elevation={3} 
    sx={{ 
      position: "fixed", 
      bottom: 80, 
      right: 16, 
      width: "40vw", 
      height: "calc(80vh - 100px)", 
      borderRadius: 2, 
      overflow: "hidden", 
      backdropFilter: "blur(10px)", 
      backgroundColor: "transparent", 
      boxShadow: 'var(--primary-color-secondary) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em' 
      }}>
      {chatContainer}
    </Paper>
  );
};

export default ChatWindow;
