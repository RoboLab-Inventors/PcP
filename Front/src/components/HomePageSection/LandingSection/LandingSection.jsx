import { Typography } from "@mui/material";
import ScrollDownButton from "../ScrollDownButton/ScrollDownButton";
import "./LandingSection.css";

const LandingSection = () => {
  return (
    <div className="landingContainer">
      <Typography variant="h1" className="landingTitle">
        Welcome to the best place to find your next home!
      </Typography>
      <Typography variant="h2" className="landingSubtitle">
        We are here to help you find the perfect home for you and your family.
      </Typography>
      <ScrollDownButton />
    </div>
  );
};

export default LandingSection;
