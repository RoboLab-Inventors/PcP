import "./HeaderButton.css";
import PropTypes from "prop-types";

const HeaderButton = ({ label = "prop" }) => {
  const handleClick = () => {
    window.location.href = `#${label}`;
  };

  return (
    <button className="button-header" onClick={handleClick}>
      {label}
    </button>
  );
};

// PropTypes validation for the label prop
HeaderButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export default HeaderButton;