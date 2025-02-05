import React from 'react';
import { Typography, TextField, Button } from '@mui/material';
import './LoginRegister.css';

const LoginCard = ({ switchToRegister }) => {
  const submit = async (e) => {
    e.preventDefault();
    const password = document.getElementById("password");
    const email = document.getElementById("email");
    await fetch("http://172.20.10.12:3000/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usmail: email.value,
        password: password.value,
      })
    });
  };

  return (
    <div className="card">
      <Typography variant="h2">Login</Typography>
      <form onSubmit={submit}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'gray',
              },
              '&:hover fieldset': {
                borderColor: 'blue',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'green',
              },
            },
          }}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          color = "var(--fontColor-main)"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'gray',
              },
              '&:hover fieldset': {
                borderColor: 'blue',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--fontColor-main)',
              },
            },
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      <p>
        Don't have an account? <a href="#" onClick={switchToRegister}>Register</a>
      </p>
    </div>
  );
};

export default LoginCard;