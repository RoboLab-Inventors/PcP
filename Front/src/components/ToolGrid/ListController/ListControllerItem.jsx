import React from "react";
import PropTypes from "prop-types";
import Chart from "../Chart/Chart";
import { useInView } from "react-intersection-observer";
import "./ListController.css";

const ListItem = ({ item, onClick }) => {
  const { ref, inView } = useInView({ triggerOnce: false });

  return (
    <div className="list-item" onClick={onClick} ref={ref}>
      <div className="mini-chart">
        {inView && (
          <Chart
            value={item.value}
            length={30}
            minValue={item.minValue}
            maxValue={item.maxValue}
            minY={item.minY}
            maxY={item.maxY}
            showDetails={false}
          />
        )}
      </div>
      <p>{item.label}</p>
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ListItem;
