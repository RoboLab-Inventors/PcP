import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";

const SearchBar = ({ onChange }) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={onChange}
      label="Cerca Configurazione"
      variant="outlined"
      placeholder="Cerca Configurazione..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
);

export default SearchBar;