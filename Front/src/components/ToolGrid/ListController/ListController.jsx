import React, { useState } from "react";
import PropTypes from "prop-types";
import ListItem from "./ListControllerItem";
import "./ListController.css";

const ListController = ({ items }) => {
  const [selectedChart, setSelectedChart] = useState(null);

  const handleItemClick = (chartType) => {
    setSelectedChart(chartType);
  };

  return (
    <div className="list-controller">
      {items.map((item, index) => (
        <ListItem key={index} item={item} onClick={handleItemClick} />
      ))}
    </div>
  );
};

ListController.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ListController;