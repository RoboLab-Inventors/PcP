<<<<<<< HEAD
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
=======
import "./ComponentDetails.css";
import "../ToolGrid.css";

const ComponentDetails = () => {
  return (
    <div>
      <h2>Component Details</h2>
      <div className="content">
        {/* Add your content here */}
        <p>Details about the component.</p>
      </div>
>>>>>>> 0b27615a0e437445f659d75e5f87bb954c3ab230
    </div>
  );
};

<<<<<<< HEAD
export default ComponentDetails;
=======
export default ComponentDetails;
>>>>>>> 0b27615a0e437445f659d75e5f87bb954c3ab230
