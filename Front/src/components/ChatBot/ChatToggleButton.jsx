import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import theme from "../../utils/theme";

const ChatToggleButton = ({ open, toggleChat }) => (
  <IconButton
    onClick={toggleChat}
    sx={{
      position: "fixed",
      bottom: 16,
      right: 16,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.fontColor.main,
      "&:hover": { backgroundColor: theme.palette.secondary.main },
    }}
  >
    <ChatIcon />
  </IconButton>
);

export default ChatToggleButton;
