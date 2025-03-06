/**
 * Il componente ListItem rende un elemento con un mini grafico e un'etichetta.
 * Il grafico viene renderizzato solo quando l'elemento è in vista.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {Object} props.item - I dati dell'elemento da visualizzare.
 * @param {number} props.item.value - Il valore per il grafico.
 * @param {number} props.item.minValue - Il valore minimo per il grafico.
 * @param {number} props.item.maxValue - Il valore massimo per il grafico.
 * @param {number} props.item.minY - Il valore minimo dell'asse Y per il grafico.
 * @param {number} props.item.maxY - Il valore massimo dell'asse Y per il grafico.
 * @param {string} props.item.label - L'etichetta da visualizzare.
 * @param {Function} props.onClick - La funzione da chiamare quando l'elemento viene cliccato.
 *
 * @returns {JSX.Element} Il componente ListItem renderizzato.
 */
import PropTypes from "prop-types";
import Chart from "../Chart/Chart";
import { useInView } from "react-intersection-observer";
import "./ListController.css";

const ListItem = ({ item, onClick, isSelected }) => {
  const { ref, inView } = useInView({ triggerOnce: false });

  return (
    <div
      className={`list-item ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      ref={ref}
    >
      <div className="mini-chart">
        {inView && (
          <Chart
            value={item.value}
            length={30}
            minValue={item.minValue}
            maxValue={item.maxValue}
            minY={item.minY}
            maxY={item.maxY}
            showDetails={false}
          />
        )}
      </div>
      <p>{item.label}</p>
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default ListItem;
