/**
 * Componente ProfileHeaderSection
 *
 * Questo componente visualizza l'header del profilo utente. Se l'utente è loggato, viene mostrato un avatar che, se cliccato, 
 * reindirizza alla pagina del profilo. Se l'utente non è loggato, vengono mostrati i pulsanti per accedere o registrarsi.
 *
 * @component
 * @example
 * return (
 *   <ProfileHeaderSection />
 * )
 *
 * @returns {JSX.Element} La sezione dell'header del profilo utente.
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileHeaderSection.css";
import Avatar from "@mui/material/Avatar";
import CustomButton from "../CustomButton/CustomButton";

const ProfileHeaderSection = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/loginregister");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <>
      {loggedIn ? (
        <Avatar onClick={handleProfileClick} />
      ) : (
        <div className="headerButtonsContainer">
          <div className="headerLoginButton">
            <CustomButton label="Accedi" onClick={handleLoginClick} />
          </div>
          <CustomButton label="Registrati" onClick={handleLoginClick} />
        </div>
      )}
    </>
  );
};

export default ProfileHeaderSection;
