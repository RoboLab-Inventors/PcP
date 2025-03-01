import ReactDOM from "react-dom";
import "./PopUp.css";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";

const PopUp = ({
  title,
  message,
  onCloseYes,
  onCloseNo,
  yesLabel,
  noLabel,
}) => {
  return ReactDOM.createPortal(
    <div className="popup">
      <div className="popup-inner">
        <Typography variant="h1">{title}</Typography>
        <Typography>{message}</Typography>
        <div className="popup-buttons">
          <CustomButton onClick={onCloseYes} label={yesLabel} />
          <CustomButton onClick={onCloseNo} label={noLabel} />
        </div>
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
