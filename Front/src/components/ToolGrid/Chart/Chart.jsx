/**
 * Chart component that renders a real-time line chart using react-chartjs-2 and Chart.js.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.value - The current value to be displayed on the chart
 * @param {number} props.length - The number of data points to display on the chart
 * @param {number} props.minValue - The minimum value for the chart data
 * @param {number} props.maxValue - The maximum value for the chart data
 * @param {number} props.minY - The minimum value for the y-axis
 * @param {number} props.maxY - The maximum value for the y-axis
 * @param {boolean} props.showDetails - Flag to show or hide details on the y-axis
 *
 * @returns {JSX.Element} The rendered Chart component
 */
import { useState, useEffect, useRef, memo } from "react";
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
import PropTypes from "prop-types";

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

const Chart = memo(
  ({ value, length, minValue, maxValue, minY, maxY, showDetails }) => {
    // Dati del grafico
    const [data, setData] = useState({
      labels: Array.from({ length }, (_, i) => i + 1),
      datasets: [
        {
          label: "Real-time Data",
          data: Array(length).fill(0),
          borderColor: theme.palette.secondary.main,
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

    // Aggiorna i dati del grafico ogni 100 millisecondi
    useEffect(() => {
      const interval = setInterval(() => {
        setData((prevData) => {
          const newData = [
            ...prevData.datasets[0].data,
            lastValueRef.current,
          ].slice(-length);
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
      }, 100);

      return () => clearInterval(interval);
    }, [length]);

    // Opzioni di configurazione per il grafico
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          min: minY,
          max: maxY,
          grid: { color: "rgba(255, 255, 255, 0.1)" },
          ticks: {
            color: theme.palette.fontColor.main,
            stepSize: (maxY - minY) / 10,
            display: showDetails,
          },
        },
        x: {
          grid: { color: "rgba(255, 255, 255, 0.1)" },
          ticks: { display: false },
        },
      },
      animation: { duration: 0 },
    };

    return (
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    );
  }
);
Chart.propTypes = {
  value: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  minY: PropTypes.number.isRequired,
  maxY: PropTypes.number.isRequired,
  showDetails: PropTypes.bool.isRequired,
};

Chart.displayName = "Chart";

export default Chart;
