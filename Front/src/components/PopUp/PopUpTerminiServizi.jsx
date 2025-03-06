/**
 * Componente CustomModalTerminiServizi.
 * 
 * @param {Object} props - Le proprietà del componente.
 * @param {boolean} [props.open=true] - Indica se il modal è aperto.
 * @param {string} props.title - Il titolo del modal.
 * @param {string} props.description - La descrizione del modal.
 * @param {function} props.onClose - Funzione chiamata quando il modal viene chiuso.
 * @param {function} props.onConfirm - Funzione chiamata quando viene confermata l'azione nel modal.
 * @param {string} props.confirmLabel - Etichetta del pulsante di conferma.
 * 
 * @returns {JSX.Element} Il componente CustomModalTerminiServizi.
 */
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
const CustomModalTerminiServizi = ({ open = true, title, description, onClose}) => {
  return (
    <Modal open={Boolean(open)} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography id="modal-title" variant="h3" component="h2" sx={{ textAlign: "center", paddingBottom: 5 }} >
          {title}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", paddingBottom: 5 }}>{description}</Typography>      
        <Box display="flex" justifyContent="space-between" mt={2}>
          <CustomButton onClick={onClose} label="Chiudi" />
        </Box>
      </Box>
    </Modal>
  );
};

CustomModalTerminiServizi.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomModalTerminiServizi;
