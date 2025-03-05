import PropTypes from "prop-types";
import ListItem from "./ListControllerItem";
import "./ListController.css";

const ListController = ({ items, onItemClick, selectedIndex }) => {
  return (
    <div className="list-controller">
      {items.map((item, index) => (
        <ListItem
          key={`${item.label}-${index}`}
          item={item}
          onClick={() => onItemClick(item, index)}
          isSelected={selectedIndex === index} // Usa il selectedIndex globale
        />
      ))}
    </div>
  );
};

ListController.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number, // Aggiunto come prop
};


export default ListController;
