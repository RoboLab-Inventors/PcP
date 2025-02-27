<<<<<<< HEAD
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
=======
import './ListController.css';
import '../ToolGrid.css';

const ListController = () => {
    return (
        <div>
            <h2>List Controller</h2>
            <div className="content">
                <p>Control the list of items here.</p>
            </div>
        </div>
    );
>>>>>>> 0b27615a0e437445f659d75e5f87bb954c3ab230
};

export default ListController;