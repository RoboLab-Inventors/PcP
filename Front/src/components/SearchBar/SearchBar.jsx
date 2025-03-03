import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const SearchBar = ({ onChange, setSearchQuery }) => (
  <form>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "90vh",
        position: "relative",
      }}
    >
      <IconButton
        type="submit"
        aria-label="search"
        sx={{
          color: "customTextColor.secondary",
          border: "1px solid #fa1e4e",
          "&:hover": {
            boxShadow: "0px 0px 15px #fa1e4e",
            backgroundColor: "#000000",
          },
          borderRadius: "5px",
          height: "3.5rem",
          margin: 1,
          backgroundColor: "#ffffff",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          padding: "0.5rem", // Padding per allineare il contenuto
          marginRight: "-1px",
          borderTop: "1px solid #e7edf1",
          borderLeft: "1px solid #e7edf1",
          borderBottom: "1px solid #e7edf1",
          borderRight: 0,
        }}
      >
        <SearchIcon
          style={{ fill: "customTextColor.secondary", fontSize: "2rem" }}
        />
      </IconButton>
      <TextField
        id="search-bar"
        className="text"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Cerca Configurazione"
        placeholder="Cerca Configurazione..."
        size="small"
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "customTextColor.secondary",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeft: 0,
            },
            "&:hover fieldset": {
              borderColor: "customTextColor.secondary",
            },
            "&.Mui-focused fieldset": {
              borderColor: "customTextColor.secondary",
            },
            "& input": {
              color: "customTextColor.secondary",
              height: "3.5rem",
              fontSize: "1rem",
              padding: "10px 14px",
              borderLeft: 0,
              boxSizing: "border-box",
            },
          },
          "& .MuiInputLabel-outlined": {
            color: "customTextColor.secondary",
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "customTextColor.secondary",
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
