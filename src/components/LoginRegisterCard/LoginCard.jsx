import React from 'react';
import { Typography, Button } from '@mui/material';
import CustomButton from '../CustomButton/CustomButton';
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
    <div className="login-register-card">
      <Typography variant="h2">Login</Typography>
      <form onSubmit={submit}>
        <div className="container-container">
          <div className="input-container">
            <input type="email" id="email" name="email" required placeholder=" " className = "input-insert"/>
            <label htmlFor="email" className = "input-label">Email</label>
            <svg className="error-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M12 8v4"></path>
              <path d="M12 16h.01"></path>
            </svg>
            <span className="tooltip">Required!</span>
          </div>
        </div>
        <div className="container-container">
          <div className="input-container">
            <input type="password" id="password" name="password" required placeholder=" " className = "input-insert"/>
            <label htmlFor="password" className = "input-label">Password</label>
            <svg className="error-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M12 8v4"></path>
              <path d="M12 16h.01"></path>
            </svg>
            <span className="tooltip">Required!</span>
          </div>
        </div>
        {/* <Button type="submit" variant="contained" color="primary">
          Login
        </Button> */}
        <CustomButton label="Login" onClick={submit} />
      </form>
      <p>
        Don't have an account? <a href="#" onClick={switchToRegister}>Register</a>
      </p>
    </div>
  );
};

export default LoginCard;