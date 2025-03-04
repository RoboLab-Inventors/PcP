/**
 * Componente per la registrazione degli utenti.
 *
 * @component
 * @param {Object} props - Le proprietà del componente.
 * @param {Function} props.switchToLogin - Funzione per passare alla schermata di login.
 * @returns {JSX.Element} Il componente RegisterCard.
 *
 * @example
 * <RegisterCard switchToLogin={handleSwitchToLogin} />
 */
import { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Select, MenuItem } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import "./LoginRegister.css";
import { BASE_URL } from "../../constants";
import { styled } from "@mui/material/styles";
import CryptoJS from 'crypto-js';


/**
 * Componente CustomMenuItem stilizzato utilizzando il tema fornito.
 * 
 * @component
 * 
 * @example
 * <CustomMenuItem>Voce di menu</CustomMenuItem>
 * 
 * @param {object} props - Le proprietà passate al componente.
 * @param {object} props.theme - Il tema utilizzato per stilizzare il componente.
 * 
 * @returns {JSX.Element} Un elemento MenuItem stilizzato.
 */
const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  color: "var(--fontColor-main)",
  backgroundColor: "var(--background-primary)",
  "&:hover": {
    backgroundColor: "var(--background-secondary)",
  },
}));
  
const RegisterCard = ({ switchToLogin }) => {
  const [gender, setGender] = useState("");
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    birthDate: "",
    gender: "",
    firstName: "",
    lastName: "",
  });
    const deriveKeyAndIV = (password) => {
      const key = CryptoJS.PBKDF2(password, CryptoJS.SHA256(password), {
        keySize: 256 / 32,
        iterations: 1000,
      });
  
      const iv = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex).slice(0, 16);
      return { key, iv: CryptoJS.enc.Hex.parse(iv) };
    };

  /**
   * Gestisce il cambiamento degli input del modulo.
   * Aggiorna lo stato del form con il nuovo valore dell'input.
   *
   * @param {Object} event - L'evento di cambiamento dell'input.
   * @param {string} event.target.name - Il nome dell'input che è cambiato.
   * @param {string} event.target.value - Il nuovo valore dell'input.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // const encryptPassword = (password) => {
  //   const encryptionKey = 'your-encryption-key';
  //   const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
  //   return CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse(encryptionKey), { iv: iv }).toString();
  // };

  /**
   * Gestisce l'invio del modulo di registrazione.
   * @param {Event} e - L'evento di submit del modulo.
   * @returns {Promise<void>} - Una Promise che risolve quando l'operazione è completata.
   * @async
   */
  const submit = async (e) => {

    const { key, iv } = deriveKeyAndIV(formData.password);
    const encryptedPassword = CryptoJS.AES.encrypt(formData.password, key, { iv }).toString();
    const response= await fetch(`${BASE_URL}/registerUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        username: formData.username,
        password: encryptedPassword,
        birthDate: formData.birthDate,
        gender: formData.gender,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }),
    });
    if(response.ok)
    {
      const data = await response.json();
      alert("Daje")
    }
  };

  return (
    <div className="login-register-body">
      <div className="login-register-card">
        <Typography variant="h2">REGISTRATI</Typography>
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
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email" className="input-label">
                Email
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
                value={formData.password}
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
          <div className="container-container">
            <div className="input-container">
              <input
                type="text"
                name="username"
                id="username"
                required
                placeholder=" "
                className="input-insert"
                value={formData.username}
                onChange={handleChange}
              />
              <label htmlFor="username" className="input-label">
                Username
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
                type="text"
                id="firstName"
                name="firstName"
                required
                placeholder=" "
                className="input-insert"
                value={formData.firstName}
                onChange={handleChange}
              />
              <label htmlFor="firstName" className="input-label">
                Nome
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
                type="text"
                id="lastName"
                name="lastName"
                required
                placeholder=" "
                className="input-insert"
                value={formData.lastName}
                onChange={handleChange}
              />
              <label htmlFor="lastName" className="input-label">
                Cognome
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
          <div className="extra-fields">
            <div className="date-container">
              <label>Data di Nascita</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                required
                className="date-insert"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>
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
          </div>
          <div className="separator">
            <div></div>
            <span>Oppure</span>
            <div></div>
          </div>
          <p>
            Hai già un account?{" "}
            <a href="#" onClick={switchToLogin} className="linkTo">
              Accedi ora
            </a>
          </p>
          <div className="button-group">
            <CustomButton
              label="Compila il Questionario"
              onClick={() =>
                window.open("https://forms.gle/uhjwk41UX9vZ4H287", "_blank")
              }
            />
            <CustomButton label="Registrati" onClick={submit} />
          </div>
        </form>
      </div>
    </div>
  );
};

RegisterCard.propTypes = {
  switchToLogin: PropTypes.func.isRequired,
};

export default RegisterCard;