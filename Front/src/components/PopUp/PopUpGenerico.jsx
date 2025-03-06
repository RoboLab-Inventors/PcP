import PropTypes from "prop-types";
import { Modal, Box, Typography } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "var(--darkgrey)",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
const CustomModalGeneric = ({ open = true, title, description, onClose, onConfirm, confirmLabel}) => {
  return (
    <Modal open={Boolean(open)} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography id="modal-title" variant="h3" component="h2" sx={{ textAlign: "center", paddingBottom: 5 }} >
          {title}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", paddingBottom: 5 }}>{description}</Typography>      
        <Box display="flex" justifyContent="space-between" mt={2}>
          <CustomButton onClick={onConfirm} label={confirmLabel} />
          <CustomButton onClick={onClose} label="Annulla" />
        </Box>
      </Box>
    </Modal>
  );
};

CustomModalGeneric.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string.isRequired,
};

export default CustomModalGeneric;
