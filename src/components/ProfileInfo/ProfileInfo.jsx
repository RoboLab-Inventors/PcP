import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Typography, TextField, Select, MenuItem } from "@mui/material";
import "./ProfileInfo.css";
import CustomButton from "../CustomButton/CustomButton";
import { styled } from "@mui/material/styles";

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  color: "var(--fontColor-main)",
  backgroundColor: "var(--background-primary)",
  "&:hover": {
    backgroundColor: "var(--background-secondary)",
  },
}));

const ProfileInfo = () => {
  const [gender, setGender] = useState("");
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [user, setUser] = useState({
    username: "johndoe",
    name: "John",
    surname: "Doe",
    email: "johndoe@example.com",
    password: "palle",
    gender: "Male",
    dob: "1990-01-01",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would usually send updated data to the backend
  };

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    window.location.href = "/home";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="infoContainer">
      <div className="primaryInfoFlow">
        <div className="nameTitle">
          <div style={{ marginRight: 10 }}>
            {isEditing ? (
              <>
                <div className="container-container">
                  <div className="input-container">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder=" "
                      className="input-insert"
                      value={user.name}
                      onChange={handleChange}
                    />
                    <label htmlFor="name" className="input-label">
                      Nome
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <Typography variant="h1" color="white">
                {user.name}
              </Typography>
            )}
          </div>
          <div style={{ marginLeft: 10 }}>
            {isEditing ? (
              <>
                <div className="container-container">
                  <div className="input-container">
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      required
                      placeholder=" "
                      className="input-insert"
                      value={user.surname}
                      onChange={handleChange}
                    />
                    <label htmlFor="surname" className="input-label">
                      Cognome
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <Typography variant="h1" color="white">
                {user.surname}
              </Typography>
            )}
          </div>
        </div>
        <div>
          {isEditing ? (
            <>
              <div style={{ marginTop: 15 }} className="container-container">
                <div className="input-container">
                  <input
                    type="text"
                    name="email"
                    id="name"
                    required
                    placeholder=" "
                    className="input-insert"
                    value={user.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email" className="input-label">
                    Email
                  </label>
                </div>
              </div>
            </>
          ) : (
            <Typography variant="h4" color="white">
              {user.email}
            </Typography>
          )}
        </div>
      </div>

      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid xs={6}>
          {isEditing ? (
            <div className="container-container">
              <div className="input-container">
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  placeholder=" "
                  className="input-insert"
                  value={user.username}
                  onChange={handleChange}
                />
                <label htmlFor="username" className="input-label">
                  Username
                </label>
              </div>
            </div>
          ) : (
            <>
              <Typography variant="subtitle1" color="white">
                USERNAME
              </Typography>
              <Typography variant="body1" color="white">
                {user.username}
              </Typography>
            </>
          )}
        </Grid>
        <Grid xs={6}>
          {isEditing ? (
            <div className="container-container">
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder=" "
                  className="input-insert"
                  value={user.password}
                  onChange={handleChange}
                />
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                {showPassword ? (
                  <svg
                    className="password-icon hover-target"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleClickShowPassword}
                  >
                    <path
                      d="M2 2L22 22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    className="password-icon hover-target"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleClickShowPassword}
                  >
                    <path
                      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          ) : (
            <>
              <Typography variant="subtitle1" color="white">
                PASSWORD
              </Typography>
              <Typography variant="body1" color="white">
                {"•".repeat(user.password.length)}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid xs={6}>
          {isEditing ? (
            <div className="gender-container">
              <label>Sesso</label>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                label="Sesso"
                value={gender}
                onChange={(e) => {
                  handleChangeGender(e);
                  handleChange(e);
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "var(--background-primary)",
                      color: "var(--fontColor-main)",
                    },
                  },
                }}
                sx={{
                  width: "100%",
                  minWidth: "160px",
                  height: "40px",
                  backgroundColor: "transparent",
                  border: "1px solid var(--fontColor-main)",
                  color: "var(--fontColor-main)",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              >
                <CustomMenuItem value="">
                  <em>Seleziona</em>
                </CustomMenuItem>
                <CustomMenuItem value="M">Maschio</CustomMenuItem>
                <CustomMenuItem value="F">Femmina</CustomMenuItem>
                <CustomMenuItem value="Altro">Altro...</CustomMenuItem>
              </Select>
            </div>
          ) : (
            <>
              <Typography variant="subtitle1" color="white">
                GENDER
              </Typography>
              <Typography variant="body1" color="white">
                {user.gender}
              </Typography>
            </>
          )}
        </Grid>
        <Grid xs={6}>
          {isEditing ? (
            <div className="date-container">
              <label>Data di Nascita</label>
              <input
                type="date"
                id="dob"
                name="dob"
                required
                className="date-insert"
                value={user.dob}
                onChange={handleChange}
              />
            </div>
          ) : (
            <>
              <Typography variant="subtitle1" color="white">
                DATE OF BIRTH
              </Typography>
              <Typography variant="body1" color="white">
                {user.dob}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        {isEditing ? (
          <Grid xs={6}>
            <CustomButton onClick={handleSave} label="Save" />
          </Grid>
        ) : (
          <Grid xs={6}>
            <CustomButton onClick={handleEdit} label="Edit" />
          </Grid>
        )}
        <Grid xs={6}>
          <CustomButton onClick={handleLogout} label="Log Out" />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileInfo;
