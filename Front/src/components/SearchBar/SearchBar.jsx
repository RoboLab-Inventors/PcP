/**
 * Componente SearchBar
 * 
 * Questo componente rappresenta una barra di ricerca con un campo di testo e un pulsante di ricerca.
 * Utilizza i componenti di Material-UI per la struttura e lo stile.
 * 
 * @param {Object} props - Le proprietà passate al componente.
 * @param {function} props.onChange - Funzione chiamata quando il contenuto del campo di testo cambia.
 * @param {function} props.setSearchQuery - Funzione chiamata per impostare la query di ricerca.
 * 
 * @returns {JSX.Element} Il componente SearchBar.
 */
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const SearchBar = ({ onChange }) => (
  <form>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "90vw",
        position: "relative",
        maxWidth: "600px",
      }}
    >
      <IconButton
        type="submit"
        aria-label="search"
        sx={{
          color: "var(--secondary)",
          border: "1px solid var(--secondary)",
          "&:hover": {
            color: "var(--background)",
            boxShadow: "0px 0px 15px var(--secondary)",
            backgroundColor: "var(--secondary)",
          },
          borderRadius: "5px",
          height: "3.5rem",
          margin: 1,
          backgroundColor: "var(--background)",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          padding: "0.5rem",
          marginRight: "-1px",
          borderTop: "1px solid var(--secondary)",
          borderLeft: "1px solid var(--secondary)",
          borderBottom: "1px solid var(--secondary)",
          borderRight: 0,
        }}
      >
        <SearchIcon style={{ fontSize: "2rem" }} />
      </IconButton>
      <TextField
        id="search-bar"
        className="text"
        onChange={onChange}
        label="Cerca Configurazione"
        placeholder="Cerca Configurazione..."
        size="small"
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "var(--primary)",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeft: 0,
            },
            "&:hover fieldset": {
              borderColor: "var(--secondary)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--secondary)",
            },
            "& input": {
              color: "var(--text)",
              height: "3.5rem",
              fontSize: "1rem",
              padding: "10px 14px",
              borderLeft: 0,
              boxSizing: "border-box",
            },
          },
          "& .MuiInputLabel-outlined": {
            color: "var(--text)",
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "var(--text)",
          },
          width: "100%",
        }}
      />
    </Box>
  </form>
);
SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
