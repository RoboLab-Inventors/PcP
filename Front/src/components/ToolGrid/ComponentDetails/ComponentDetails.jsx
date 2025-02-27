import React from "react";
import Chart from "../Chart/Chart";
import "./ComponentDetails.css";
const ComponentDetails = ({ items, chartData }) => {
  const currentItem = items.find(item => item.label === chartData.label);

  return (
    <div className="component-container">
      {currentItem && (
        <Chart
          value={currentItem.value}
          length={30}
          minValue={currentItem.minValue}
          maxValue={currentItem.maxValue}
          minY={currentItem.minY}
          maxY={currentItem.maxY}
          showDetails={true}
        />
      )}
      <p>Value: {currentItem.value}</p>
    </div>
  );
};

export default ComponentDetails;