/**
 * Componente RoutesPath
 * 
 * Questo componente definisce le rotte dell'applicazione utilizzando il componente Routes di react-router-dom.
 * 
 * Rotte definite:
 * - "/" e "*" -> Home
 * - "/Tool" -> ToolPage
 * - "/AboutUs" -> AboutUs
 * - "/LoginRegister" -> LoginRegisterPage
 * - "/Community" -> Community (protetta da ProtectedRoute)
 * - "/Lessons" -> Lessons (protetta da ProtectedRoute)
 * - "/Profile" -> Profile (protetta da ProtectedRoute)
 * 
 * @component
 */
import Home from "../pages/Homepage/Home";
import ToolPage from "../pages/ToolPage/ToolPage";
import AboutUs from "../pages/AboutUs/AboutUs";
import Lessons from "../pages/Lessons/Lessons";
import Community from "../pages/Community/Community";
import LoginRegisterPage from "../pages/LoginRegisterPage/LoginRegisterPage";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes } from "react-router-dom";

function RoutesPath() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="Tool" element={<ToolPage />} />
        <Route path="AboutUs" element={<AboutUs />} />
        <Route path="LoginRegister" element={<LoginRegisterPage />} />
        <Route
          path="Community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />
        <Route
          path="Lessons"
          element={
            <ProtectedRoute>
              <Lessons />
            </ProtectedRoute>
          }
        />
        <Route
          path="Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default RoutesPath;
