import Home from "../pages/Homepage/Home";
import ToolPage from "../pages/ToolPage/ToolPage";
import Lessons from "../pages/Lessons/Lessons";
import Community from "../pages/Community/Community";
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
      </Routes>
    </>
  );
}

export default RoutesPath;
