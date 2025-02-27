import { useState, useEffect, useRef } from "react";
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
import theme from "../../../utils/theme";
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

const Chart = ({ value, length, minValue, maxValue, minY, maxY, showDetails }) => {
  const [data, setData] = useState({
    labels: Array.from({ length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Real-time Data',
        data: Array(length).fill(0),
        borderColor: theme.palette.primary.secondary,
        backgroundColor: "rgba(213, 161, 40, 0.5)",
        color: theme.palette.fontColor.main,
        borderWidth: 3,
        pointRadius: 0,
        fill: "start",
      },
    ],
  });

  const lastValueRef = useRef(value);

  useEffect(() => {
    lastValueRef.current = value;
  }, [value]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.datasets[0].data, lastValueRef.current].slice(-length);
        return {
          ...prevData,
          labels: Array.from({ length: newData.length }, (_, i) => i + 1),
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData,
            },
          ],
        };
      });
    }, 50); // Aggiorna ogni secondo

    return () => clearInterval(interval);
  }, [length]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
    animation: {
      duration: 0,
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;