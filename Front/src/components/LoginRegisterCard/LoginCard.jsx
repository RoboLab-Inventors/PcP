/**
 * Componente LoginCard per gestire il login degli utenti.
 *
 * @component
 * @param {Object} props - Proprietà passate al componente.
 * @param {Function} props.switchToRegister - Funzione per passare alla schermata di registrazione.
 *
 * @returns {JSX.Element} Il componente LoginCard.
 *
 * @example
 * <LoginCard switchToRegister={handleSwitchToRegister} />
 *
 * @description
 * Questo componente visualizza un modulo di login con campi per email e password.
 * La password viene crittografata utilizzando bcryptjs prima di essere inviata al server.
 * Se il login ha successo, il token e le informazioni dell'utente vengono salvati nel localStorage.
 */
import { useState } from "react";
import { Typography } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import "./LoginRegister.css";
import { BASE_URL } from "../../constants";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
// import bcrypt from "bcryptjs";

import PropTypes from "prop-types";

const LoginCard = ({ switchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  /**
   * Deriva una chiave e un vettore di inizializzazione (IV) da una password.
   *
   * @param {string} password - La password da cui derivare la chiave e l'IV.
   * @returns {{ key: CryptoJS.lib.WordArray, iv: CryptoJS.lib.WordArray }} Un oggetto contenente la chiave derivata e l'IV.
   */
  const deriveKeyAndIV = (password) => {
    const key = CryptoJS.PBKDF2(password, CryptoJS.SHA256(password), {
      keySize: 256 / 32,
      iterations: 1000,
    });

    const iv = CryptoJS.SHA256(password)
      .toString(CryptoJS.enc.Hex)
      .slice(0, 16);
    return { key, iv: CryptoJS.enc.Hex.parse(iv) };
  };

  /**
   * Gestisce l'invio del modulo di login.
   * 
   * @param {Event} e - L'evento di submit del modulo.
   * @returns {Promise<void>} - Una promessa che si risolve quando il login è completato.
   * 
   * La funzione esegue le seguenti operazioni:
   * 1. Previene il comportamento predefinito del modulo.
   * 2. Recupera l'email e la password dai campi di input.
   * 3. Crittografa la password utilizzando una chiave derivata e un IV.
   * 4. Invia una richiesta POST al server per autenticare l'utente.
   * 5. Se la risposta contiene un token, lo salva nel localStorage insieme a username ed email.
   * 6. Reindirizza l'utente alla homepage.
   */
  const submit = async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Crittografa la password senza usare lo stato
    const { key, iv } = deriveKeyAndIV(password);
    const encryptedPassword = CryptoJS.AES.encrypt(password, key, {
      iv,
    }).toString();

    const response = await fetch(`${BASE_URL}/loginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: encryptedPassword,
      }),
    });

    const responseData = await response.json();
    if (responseData.token) {
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("username", responseData.username);
      localStorage.setItem("email", responseData.email);
    }
    navigate("/");
  };

  return (
    <div className="login-register-body">
      <div className="login-register-card">
        <Typography variant="h2">Login</Typography>
        <form onSubmit={submit}>
          <div className="container-container">
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder=" "
                className="input-insert"
              />
              <label htmlFor="email" className="input-label">
                Email o Username
              </label>
              <svg
                className="error-icon hover-target"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M12 8v4"></path>
                <path d="M12 16h.01"></path>
              </svg>
              <span className="tooltip">Required!</span>
            </div>
          </div>
          <div className="container-container">
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                placeholder=" "
                className="input-insert"
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
                  onClick={() => setShowPassword(!showPassword)}
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
                  onClick={() => setShowPassword(!showPassword)}
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
          <CustomButton label="Accedi" onClick={submit} />
        </form>
        <p style={{ color: "var(--text)" }}>
          Non hai un account?{" "}
          <a href="#" onClick={switchToRegister} className="linkTo">
            Registrati
          </a>
        </p>
      </div>
    </div>
  );
};

LoginCard.propTypes = {
  switchToRegister: PropTypes.func.isRequired,
};

export default LoginCard;
