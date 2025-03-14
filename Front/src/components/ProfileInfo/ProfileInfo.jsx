/**
 * Componente ProfileInfo
 * 
 * Questo componente visualizza e consente di modificare le informazioni del profilo utente.
 * 
 * @component
 * 
 * @returns {JSX.Element} Il componente ProfileInfo.
 * 
 * @example
 * <ProfileInfo />
 * 
 * @description
 * Il componente utilizza gli hook `useState` e `useEffect` per gestire lo stato e gli effetti collaterali.
 * 
 * @property {boolean} isEditing - Stato che indica se il profilo è in modalità modifica.
 * @property {boolean} showPassword - Stato che indica se la password è visibile.
 * @property {Object} user - Oggetto che contiene le informazioni dell'utente.
 * @property {string} user.nome - Nome dell'utente.
 * @property {string} user.cognome - Cognome dell'utente.
 * @property {string} user.email - Email dell'utente.
 * @property {string} user.username - Username dell'utente.
 * @property {string} user.password - Password dell'utente.
 * @property {string} user.dataNascita - Data di nascita dell'utente.
 * @property {string} user.sesso - Sesso dell'utente.
 *
 */
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Typography, Select, MenuItem } from "@mui/material";
import "./ProfileInfo.css";
import CustomButton from "../CustomButton/CustomButton";
import { styled } from "@mui/material/styles";
import { BASE_URL } from "../../constants";

// Definisce un componente MenuItem personalizzato con stili specifici
const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  color: "var(--fontColor-main)",
  backgroundColor: "var(--background-primary)",
  "&:hover": {
    backgroundColor: "var(--background-secondary)",
  },
}));

const ProfileInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [user, setUser] = useState({
    nome: "",
    cognome: "",
    email: "",
    username: "",
    password: "",
    dataNascita: "",
    sesso: "",
  });

  useEffect(() => {
    /**
     * Recupera i dati dell'utente dal server.
     * 
     * Questa funzione esegue una richiesta POST al server per ottenere i dati dell'utente
     * utilizzando l'email e il nome utente memorizzati nel localStorage. I dati dell'utente
     * vengono quindi aggiornati nello stato locale.
     * 
     * @async
     * @function fetchUserData
     * @returns {Promise<void>} Una promessa che si risolve quando i dati dell'utente sono stati recuperati e lo stato è stato aggiornato.
     * @throws {Error} Se si verifica un errore durante il recupero dei dati dell'utente.
     */
    const fetchUserData = async () => {
      const email = localStorage.getItem("email");
      const username = localStorage.getItem("username");
      try {
        const response = await fetch(`${BASE_URL}/getUserData`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ email, username }),
        });
        const data = await response.json();
        if (data.data && data.data.dataNascita) {
          data.data.dataNascita = new Date(data.data.dataNascita)
            .toISOString()
            .split("T")[0];
        }

        setUser(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  /**
   * Gestisce il salvataggio delle informazioni dell'utente.
   * 
   * Questa funzione viene chiamata quando l'utente salva le modifiche al proprio profilo.
   * Disabilita la modalità di modifica, aggiorna le informazioni nel localStorage e invia una richiesta
   * al server per aggiornare i dati dell'utente.
   * 
   * @async
   * @function handleSave
   * @returns {void}
   */
  const handleSave = async () => {
    setIsEditing(false);
    const emailAttuale = localStorage.getItem("email");
    if (localStorage.getItem("email") !== user.email) {
      localStorage.setItem("email", user.email);
    }
    if (localStorage.getItem("username") !== user.username) {
      localStorage.setItem("username", user.username);
    }
    const response = await fetch(`${BASE_URL}/modifyUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email: user.email,
        username: user.username,
        birthDate: user.dataNascita,
        gender: user.sesso,
        nome: user.nome,
        cognome: user.cognome,
        emailAttuale: emailAttuale !== "" ? emailAttuale : user.email,
      }),
    });

    if (response.ok) {
      window.location.reload();
    }
  };

  const handleLogout = () => {
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
                      name="nome"
                      id="nome"
                      required
                      placeholder=" "
                      className="input-insert"
                      value={user.nome}
                      onChange={handleChange}
                    />
                    <label htmlFor="nome" className="input-label">
                      Nome
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <Typography variant="h1" color="white">
                {user.nome}
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
                      name="cognome"
                      id="cognome"
                      required
                      placeholder=" "
                      className="input-insert"
                      value={user.cognome}
                      onChange={handleChange}
                    />
                    <label htmlFor="cognome" className="input-label">
                      Cognome
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <Typography variant="h1" color="white">
                {user.cognome}
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
                    id="email"
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
                  value={"Palle"}
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
                {"•".repeat("*", 5)}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid xs={6}>
          {isEditing ? (
            <div className="dobAndGenderResponsive">
              <div className="gender-container">
                <label>Sesso</label>
                <Select
                  labelId="gender-label"
                  id="sesso"
                  name="sesso"
                  label="Sesso"
                  value={user.sesso}
                  onChange={(e) => {
                    handleChangeGender(e);
                    handleChange(e);
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "var(--text)",
                        color: "var(--background)",
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                    minWidth: "160px",
                    height: "40px",
                    backgroundColor: "transparent",
                    border: "1px solid var(--text)!important",
                    color: "var(--background)!important",
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
          ) : (
            <>
              <Typography variant="subtitle1" color="white">
                GENDER
              </Typography>
              <Typography variant="body1" color="white">
                {user.sesso}
              </Typography>
            </>
          )}
        </Grid>
        <Grid xs={6}>
          {isEditing ? (
            <div className="dobAndGenderResponsive">
              <div className="date-container">
                <label>Data di Nascita</label>
                <input
                  type="date"
                  id="dataNascita"
                  name="dataNascita"
                  required
                  className="date-insert"
                  value={user.dataNascita}
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : (
            <>
              <Typography variant="subtitle1" color="white">
                DATE OF BIRTH
              </Typography>
              <Typography variant="body1" color="white">
                {user.dataNascita}
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
