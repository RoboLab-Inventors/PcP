import "./AboutUs.css";
import HeaderSwitch from "../../components/HeaderSwitch/HeaderSwitch";
import Section from "../../components/AboutUsSections/AccordionSection/Section";
import HeroSection from "../../components/AboutUsSections/HeroSection/HeroSection";

function AbousUs() {
  return (
    <>
      <HeaderSwitch />
      <HeroSection />
      <Section />
    </>
  );
}

export default AbousUs;
