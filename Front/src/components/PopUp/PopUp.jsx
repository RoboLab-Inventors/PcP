import ReactDOM from "react-dom";
import "./PopUp.css";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";

const PopUp = ({ title, message, onClose }) => {
  return ReactDOM.createPortal(
    <div className="popup">
      <div className="popup-inner">
        <Typography variant="h1">{title}</Typography>
        <Typography>{message}</Typography>
        <CustomButton onClick={onClose} label="Procedi" />
        <CustomButton onClick={onClose} label="Cancella" />
      </div>
    </div>,
    document.body // Render the popup at the root level
  );
};

PopUp.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopUp;
