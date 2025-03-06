/**
 * Componente HomeViewer
 * 
 * Questo componente funge da contenitore per diverse sezioni della homepage.
 * Include le seguenti sezioni:
 * - LandingSection: Sezione di atterraggio della homepage.
 * - ChiSiamoSection: Sezione che descrive chi siamo.
 * - ExplanationSection: Sezione che fornisce spiegazioni aggiuntive.
 * 
 * @component
 * @example
 * return (
 *   <HomeViewer />
 * )
 */
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
