/**
 * ComponentDetails component renders a chart and details for a specific item.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.items - The list of items to search through.
 * @param {Object} props.chartData - The data used to find the current item.
 * @param {string} props.chartData.label - The label used to match the current item.
 *
 * @returns {JSX.Element} The rendered component.
 */
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