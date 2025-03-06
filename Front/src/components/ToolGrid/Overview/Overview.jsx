/**
 * Componente Overview.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {Array} props.items - Array di oggetti da visualizzare nella griglia.
 * @param {Function} props.onItemClick - Funzione chiamata quando un elemento viene cliccato.
 * @param {number} [props.selectedIndex] - Indice dell'elemento selezionato.
 *
 * @returns {JSX.Element} Il componente Overview.
 */
import PropTypes from "prop-types";
import "./Overview.css";

const Overview = ({ items, onItemClick, selectedIndex }) => {
  return (
    <div className="table-container">
      <div className="table">
        {items.map((item, index) => (
          <div
            key={index}
            className={`table-item ${selectedIndex === index ? "selected" : ""}`}
            onClick={() => onItemClick(item, index)}
          >
            {item.label}: {parseFloat(item.value).toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  );
};

Overview.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number, // Aggiunto come prop
};


export default Overview;
