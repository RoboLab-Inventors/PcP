import { Typography } from "@mui/material";
import "./ExplanationSection.css";

const ExplanationSection = () => {
  return (
    <div className="explanationContainer">
      <Typography variant="h1" className="landingTitle">
        Welcome to the best place to find your next home!
      </Typography>
      <Typography variant="h2" className="landingSubtitle">
        We are here to help you find the perfect home for you and your family.
      </Typography>
    </div>
  );
};

export default ExplanationSection;
