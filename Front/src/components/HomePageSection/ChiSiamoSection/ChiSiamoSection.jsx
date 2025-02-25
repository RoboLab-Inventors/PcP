import { Typography } from "@mui/material";
import "./ChiSiamoSection.css";

const ChiSiamoSection = () => {
  return (
    <div className="chiSiamoContainer">
      <Typography variant="h1" className="landingTitle">
        Welcome to the best place to find your next home!
      </Typography>
      <Typography variant="h2" className="landingSubtitle">
        We are here to help you find the perfect home for you and your family.
      </Typography>
    </div>
  );
};

export default ChiSiamoSection;
