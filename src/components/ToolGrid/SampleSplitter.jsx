import { useState } from "react";
import PropTypes from "prop-types";
import { cn } from "./utils/cn";
import "./SampleSplitter.css";

const SampleSplitter = ({ id = "drag-bar", dir, isDragging, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      id={id}
      data-testid={id}
      tabIndex={0}
      className={cn(
        "sample-drag-bar",
        dir === "horizontal" && "sample-drag-bar--horizontal",
        (isDragging || isFocused) && "sample-drag-bar--dragging"
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

SampleSplitter.propTypes = {
  id: PropTypes.string,
  dir: PropTypes.string.isRequired,
  isDragging: PropTypes.bool,
};


export default SampleSplitter;
