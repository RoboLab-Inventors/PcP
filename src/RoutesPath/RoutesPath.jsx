import Home from "../pages/Homepage/Home";
import ToolPage from "../pages/ToolPage/ToolPage";
import AboutUs from "../pages/AboutUs/AboutUs";
import Lessons from "../pages/Lessons/Lessons";
import Community from "../pages/Community/Community";
import LoginRegisterPage from "../pages/LoginRegisterPage/LoginRegisterPage";
import { Route, Routes } from "react-router-dom";

function RoutesPath() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="Tool" element={<ToolPage />} />
        <Route path="Lessons" element={<Lessons />} />
        <Route path="Community" element={<Community />} />
        <Route path="AboutUs" element={<AboutUs/>} />
        <Route path="LoginRegister" element={<LoginRegisterPage />} />
      </Routes>
    </>
  );
}

export default RoutesPath;
