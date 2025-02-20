import React from "react";
import PropTypes from "prop-types";
import Chart from "../ComponentDetails/Chart/Chart";
import "./ListController.css";

const ListItem = ({ item, onClick }) => {
  return (
    <div className="list-item" onClick={() => onClick(item.chartType)}>
      <div className="mini-chart">
        <Chart
          length={30}
          minValue={item.minValue}
          maxValue={item.maxValue}
          minY={item.minY}
          maxY={item.maxY}
          showDetails={false}
        />
      </div>
      <p>{item.chartType}</p>
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ListItem;