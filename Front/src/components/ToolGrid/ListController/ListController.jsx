/**
 * ListController component renders a list of items and handles item click events.
 *
 * @component
 * @param {Object[]} items - Array of items to be displayed in the list.
 * @param {function} onItemClick - Callback function to handle item click events.
 *
 * @example
 * const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
 * const handleItemClick = (item) => console.log(item);
 * 
 * <ListController items={items} onItemClick={handleItemClick} />
 */
import { useState, useEffect } from "react";
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