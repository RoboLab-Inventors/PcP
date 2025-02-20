import Chart from "./Chart/Chart";
import "./ComponentDetails.css";

const ComponentDetails = ({ chartType }) => {
  const getChart = () => {
    switch (chartType) {
      case "AxisChart":
        return (
          <Chart
            length={50}
            minValue={-255}
            maxValue={256}
            minY={-350}
            maxY={350}
          />
        );
      case "SimpleButtonChart":
        return (
          <Chart length={30} minValue={0} maxValue={2} minY={-0.1} maxY={1.1} />
        );
      case "ThreeWayButtonChart":
        return (
          <Chart length={30} minValue={0} maxValue={3} minY={-0.1} maxY={2.1} />
        );
      default:
        return <p>No chart available for the selected type.</p>;
    }
  };

  return (
    <div className="component-container">
      <div className="component-content">{getChart()}</div>
    </div>
  );
};

export default ComponentDetails;
