import { useState } from "react";
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
