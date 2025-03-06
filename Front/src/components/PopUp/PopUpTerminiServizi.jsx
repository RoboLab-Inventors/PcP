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
  maxHeight: "80vh",  // Increased from 30vh to provide more space if needed
  height: "auto",     // Added to ensure proper sizing
  overflowY: "auto",
  display: "flex",    // Added to create a flex container
  flexDirection: "column", // Stack children vertically
};

const CustomModalTerminiServizi = ({ open = true, title, description, onClose}) => {
  return (
    <Modal open={Boolean(open)} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography id="modal-title" variant="h3" component="h2" sx={{ textAlign: "center", paddingBottom: 5, flexShrink: 0 }} >
          {title}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: "center", 
            paddingBottom: 5,
            overflowY: "auto", // Ensure this specific content can scroll
            flexGrow: 1,      // Allow this to grow and take available space
            wordBreak: "break-word" // Prevent text from overflowing horizontally
          }}
        >
          {description}
        </Typography>      
        <Box display="flex" justifyContent="space-between" mt={2} sx={{ flexShrink: 0 }}>
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
