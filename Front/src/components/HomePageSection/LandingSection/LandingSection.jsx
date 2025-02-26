import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import ScrollDownButton from "../ScrollDownButton/ScrollDownButton";
import "./LandingSection.css";
import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { OrbitControls } from "../../../../node_modules/three/examples/jsm/controls/OrbitControls.js";
console.log(THREE, OrbitControls);
import GLOBE from "vanta/dist/vanta.globe.min";

const LandingSection = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xffffff,
          color2: 0x0,
          size: 0.6,
          backgroundColor: 0xffc868,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="landingContainer" ref={vantaRef}>
      <Typography variant="h1" className="landingTitle">
        Prototype Controller Profiler
      </Typography>
      <ScrollDownButton />
    </div>
  );
};

export default LandingSection;
