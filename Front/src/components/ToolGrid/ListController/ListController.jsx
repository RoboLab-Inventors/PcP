import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ListItem from "./ListControllerItem";
import "./ListController.css";

const ListController = ({ items, onItemClick }) => {

  return (
    <div className="list-controller">
      {items.map((item, index) => (
        <ListItem key = {index} item={item} onClick={() => onItemClick(item)} />
      ))}
    </div>
    
  );
};

ListController.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ListController;