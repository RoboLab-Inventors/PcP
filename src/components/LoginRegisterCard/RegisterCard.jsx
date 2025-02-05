import React from 'react';
import './LoginRegister.css';

const RegisterCard = ({ switchToLogin }) => {
  return (
    <div className="card">
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="#" onClick={switchToLogin}>Login</a>
      </p>
    </div>
  );
};

export default RegisterCard;