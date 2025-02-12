import { useState } from "react";
import "./ProfileHeaderSection.css";
import Avatar from "@mui/material/Avatar";
import CustomButton from "../CustomButton/CustomButton";

const ProfileHeaderSection = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      {loggedIn ? (
        <Avatar />
      ) : (
        <>
          <CustomButton label="Accedi" />
          <CustomButton label="Registrati" />
        </>
      )}
    </>
  );
};

export default ProfileHeaderSection;
