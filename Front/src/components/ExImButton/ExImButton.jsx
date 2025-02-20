import PropTypes from "prop-types";
import "./ExImButton.css";

const ExImButton = ({ primaryContent, secondaryContent }) => {
    return (
        <a className="face-button" href="#">
            <div className="face-primary">
                {primaryContent}
            </div>
            <div className="face-secondary">
                {secondaryContent}
            </div>
        </a>
    );
};

ExImButton.propTypes = {
    primaryContent: PropTypes.node.isRequired,
    secondaryContent: PropTypes.node.isRequired
};

export default ExImButton;