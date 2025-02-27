import "./ChatBot.css";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import theme from "../../utils/theme";
import PropTypes from "prop-types";

const ChatToggleButton = ({ toggleChat }) => (
  <IconButton
    className="chatToggleButton"
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
ChatToggleButton.propTypes = {
  toggleChat: PropTypes.func.isRequired,
};

export default ChatToggleButton;
