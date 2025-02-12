import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Typography, TextField, Button } from "@mui/material";
import "./ProfileInfo.css";

const ProfileInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
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
    // Add logout logic here
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
                <Typography variant="subtitle1" color="white">
                  NAME
                </Typography>
                <TextField
                  fullWidth
                  name="name"
                  type="text"
                  value={user.name}
                  onChange={handleChange}
                />
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
                <Typography variant="subtitle1" color="white">
                  SURNAME
                </Typography>
                <TextField
                  fullWidth
                  name="surname"
                  type="text"
                  value={user.surname}
                  onChange={handleChange}
                />
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
              <Typography variant="subtitle1" color="white">
                EMAIL
              </Typography>
              <TextField
                fullWidth
                name="email"
                type="text"
                value={user.email}
                onChange={handleChange}
              />
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
          <Typography variant="subtitle1" color="white">
            USERNAME
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="username"
              type="text"
              value={user.username}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="body1" color="white">
              {user.username}
            </Typography>
          )}
        </Grid>
        <Grid xs={6}>
          <Typography variant="subtitle1" color="white">
            PASSWORD
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="body1" color="white">
              {user.password}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid xs={6}>
          <Typography variant="subtitle1" color="white">
            GENDER
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="gender"
              type="text"
              value={user.gender}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="body1" color="white">
              {user.gender}
            </Typography>
          )}
        </Grid>
        <Grid xs={6}>
          <Typography variant="subtitle1" color="white">
            DATE OF BIRTH
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="dob"
              type="text"
              value={user.dob}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="body1" color="white">
              {user.dob}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        {isEditing ? (
          <Grid xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSave}
            >
              Save
            </Button>
          </Grid>
        ) : (
          <Grid xs={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleEdit}
            >
              Edit
            </Button>
          </Grid>
        )}
        <Grid xs={6}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileInfo;
