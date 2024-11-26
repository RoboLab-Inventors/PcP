import Home from "../pages/Homepage/Home";
import ToolPage from "../pages/ToolPage/ToolPage";
import { Route, Routes } from "react-router-dom";

function RoutesPath() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home/>} />
        <Route path="Tool" element={<ToolPage/>} />
      </Routes>
    </>
  );
}

export default RoutesPath;
