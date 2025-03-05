import React, { useState } from "react";
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

const CustomModal = ({ open = true, title, onClose, onConfirm, confirmLabel, setTitle, setDescription }) => {
  const [visibility, setVisibility] = useState("");

  console.log("Modal open state:", open);

  return (
    <Modal open={Boolean(open)} onClose={onClose} container={document.body} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">{title}</Typography>
        <CustomTextField
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setTitle(e.target.value)}
        />
        <CustomTextField
          label="Descrizione"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <Typography variant="body1">Stato</Typography>
          <CustomSelect
            fullWidth
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            sx={{ mt: 1 }}
          >
            <CustomMenuItem value="">
              <em>Seleziona</em>
            </CustomMenuItem>
            <CustomMenuItem value="Pubblico">Pubblico</CustomMenuItem>
            <CustomMenuItem value="Privato">Privato</CustomMenuItem>
          </CustomSelect>
        </div>
        <Typography id="select-description" sx={{ mt: 2 }}>
          Se clicchi pubblica il tuo progetto sarà visibile a tutti.
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <CustomButton onClick={onConfirm} label={confirmLabel} />
          <CustomButton onClick={onClose} label="Annulla" />
        </Box>
      </Box>
    </Modal>
  );
};

CustomModal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
};

export default CustomModal;
