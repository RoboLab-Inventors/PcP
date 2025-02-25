import "./HomeViewer.css";
import LandingSection from "../LandingSection/LandingSection";
import ExplanationSection from "../ExplanationSection/ExplanationSection";
import ChiSiamoSection from "../ChiSiamoSection/ChiSiamoSection";

const HomeViewer = () => {
  return (
    <div className="viewer">
      <LandingSection />
      <ChiSiamoSection />
      <ExplanationSection />
    </div>
  );
};

export default HomeViewer;
