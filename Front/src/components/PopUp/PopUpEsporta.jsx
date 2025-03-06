/**
 * Componente CustomModalExport
 *
 * @component
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {boolean} [props.open=true] - Stato di apertura del modal.
 * @param {function} props.onClose - Funzione chiamata quando il modal viene chiuso.
 * @param {function} props.onConfirm - Funzione chiamata quando viene confermata l'azione.
 * @param {string} props.confirmLabel - Etichetta del pulsante di conferma.
 * @param {function} props.setTitle - Funzione per impostare il titolo.
 * @param {function} props.setDescription - Funzione per impostare la descrizione.
 * @param {function} props.setStato - Funzione per impostare lo stato.
 *
 * @returns {JSX.Element} Il componente CustomModalExport.
 */
import { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomButton from "../CustomButton/CustomButton";

const CustomMenuItem = styled(MenuItem)(() => ({
  color: "var(--text)",
  backgroundColor: "var(--darkgrey)",
  "&:hover": {
    backgroundColor: "var(--grey)",
  },
}));

const CustomTextField = styled(TextField)(() => ({
  color: "var(--text)",
  paddingBottom: "20px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--text)",
    },
    "&:hover fieldset": {
      borderColor: "var(--text)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--text)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "var(--text)",
  },
  "& .MuiOutlinedInput-input": {
    color: "var(--text)",
  },
  "& .MuiInputBase-multiline": {
    color: "var(--text)",
  },
  "& .MuiInputBase-root": {
    color: "var(--text)",
  },
}));

const CustomSelect = styled(Select)(() => ({
  marginBottomm: "20px",
  color: "var(--text)",
  backgroundColor: "var(--darkgrey)",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--text)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--text)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--text)",
  },
}));

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

const CustomModalExport = ({
  open = true,
  onClose,
  onConfirm,
  confirmLabel,
  setTitle,
  setDescription,
  setStato,
}) => {
  const [visibility, setVisibility] = useState("");

  const handleStatoChange = (e) => {
    setVisibility(e.target.value);
    setStato(e.target.value);
  };

  return (
    <Modal open={Boolean(open)} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <CustomTextField
          label="Nome"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
        />
        <CustomTextField
          label="Descrizione"
          fullWidth
          multiline
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Typography variant="body1">Stato</Typography>
        <CustomSelect
          fullWidth
          value={visibility}
          onChange={handleStatoChange}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "var(--darkgrey)",
                "& .MuiMenuItem-root": {
                  color: "var(--text)",
                },
                "& .MuiMenuItem-root:hover": {
                  backgroundColor: "var(--grey)",
                },
              },
            },
          }}
        >
          <CustomMenuItem value="">
            <em>Seleziona</em>
          </CustomMenuItem>
          <CustomMenuItem value="Pubblico">Pubblico</CustomMenuItem>
          <CustomMenuItem value="Privato">Privato</CustomMenuItem>
        </CustomSelect>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <CustomButton onClick={onConfirm} label={confirmLabel} />
          <CustomButton onClick={onClose} label="Annulla" />
        </Box>
      </Box>
    </Modal>
  );
};

CustomModalExport.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setStato: PropTypes.func.isRequired,
};

export default CustomModalExport;
