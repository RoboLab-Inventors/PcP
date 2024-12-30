import Home from "../pages/Homepage/Home";
import ToolPage from "../pages/ToolPage/ToolPage";
import AboutUs from "../pages/AboutUs/AboutUs";
import { Route, Routes } from "react-router-dom";

function RoutesPath() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home/>} />
        <Route path="Tool" element={<ToolPage/>} />
        <Route path="AboutUs" element={<AboutUs/>} />
      </Routes>
    </>
  );
}

export default RoutesPath;
