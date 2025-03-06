import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography, TextField, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomButton from "../CustomButton/CustomButton";

const CustomMenuItem = styled(MenuItem)(() => ({
  color: "var(--fontColor-main)",
  backgroundColor: "var(--background-primary)",
  "&:hover": {
    backgroundColor: "var(--background-secondary)",
  },
}));

const CustomTextField = styled(TextField)(() => ({
  color: "var(--fontColor-main)",
  paddingBottom: "20px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--borderColor)",
    },
    "&:hover fieldset": {
      borderColor: "var(--borderHoverColor)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--borderFocusColor)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "var(--fontColor-main)",
  },
  "& .MuiOutlinedInput-input": {
    color: "var(--fontColor-main)",
  },
  "& .MuiInputBase-multiline": {
    color: "var(--fontColor-main)",
  },
  "& .MuiInputBase-root": {
    color: "var(--fontColor-main)",
  },
}));

const CustomSelect = styled(Select)(() => ({
  marginBottomm: "20px",
  color: "var(--fontColor-main)",
  backgroundColor: "var(--background-primary)",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--borderColor)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--borderHoverColor)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--borderFocusColor)",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "var(--background-primary)",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const CustomModalExport = ({ open = true, onClose, onConfirm, confirmLabel, setTitle, setDescription, setStato }) => {
  const [visibility, setVisibility] = useState("");

  const handleStatoChange = (e) => {
    setVisibility(e.target.value);
    setStato(e.target.value);
  };

  return (
    <Modal open={Boolean(open)} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <CustomTextField label="Nome" fullWidth onChange={(e) => setTitle(e.target.value)} />
        <CustomTextField label="Descrizione" fullWidth multiline rows={4} onChange={(e) => setDescription(e.target.value)} />
        
        <Typography variant="body1">Stato</Typography>
        <CustomSelect fullWidth value={visibility} onChange={handleStatoChange}>
          <CustomMenuItem value=""><em>Seleziona</em></CustomMenuItem>
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
