import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import theme from "../../../../utils/theme";

import "./Chart.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const generateChartData = (length, minValue, maxValue) => {
  return {
    labels: Array.from({ length }, (_, i) => i.toString()),
    datasets: [
      {
        label: "Dati in tempo reale",
        data: Array.from({ length }, () => Math.random() * 0),
        borderColor: theme.palette.primary.secondary,
        backgroundColor: "rgba(213, 161, 40, 0.5)",
        color: theme.palette.fontColor.main,
        borderWidth: 3,
        pointRadius: 0,
        fill: "start",
      },
    ],
  };
};

const generateChartOptions = (minY, maxY, showDetails) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: minY,
        max: maxY,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: theme.palette.fontColor.main,
          stepSize: (maxY - minY) / 10,
          display: showDetails,
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          display: false,
        },
      },
    },
  };
};

const Chart = ({ length, minValue, maxValue, minY, maxY, showDetails }) => {
  const [data, setData] = useState(
    generateChartData(length, minValue, maxValue)
  );
  const [currentValue, setCurrentValue] = useState(
    data.datasets[0].data[data.datasets[0].data.length - 1]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.datasets[0].data];
        newData.shift();
        let newValue;
        switch (maxValue) {
          case 256:
            newValue = Math.random() * (maxValue - minValue) + minValue;
            break;
          case 2:
          case 3:
            newValue = Math.floor(
              Math.random() * (maxValue - minValue) + minValue
            );
            break;
        }
        newData.push(newValue);
        setCurrentValue(newValue);
        return {
          ...prevData,
          datasets: [{ ...prevData.datasets[0], data: newData }],
        };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [minValue, maxValue]);

  return (
    <div className="chart-container">
      <div className="chart-details">
        <Line
          data={data}
          options={generateChartOptions(minY, maxY, showDetails)}
        />
      </div>
      {showDetails && <p>Value: {currentValue.toFixed(2)}</p>}
    </div>
  );
};

export default Chart;
