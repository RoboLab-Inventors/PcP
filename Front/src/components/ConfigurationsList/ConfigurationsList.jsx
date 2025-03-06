/**
 * Componente ConfigurationsList
 *
 * Questo componente recupera e visualizza una lista di configurazioni utente.
 * Utilizza il componente ProfileConfigurationCard per visualizzare ogni configurazione.
 *
 * @component
 *
 * @example
 * return (
 *   <ConfigurationsList />
 * )
 *
 * @returns {JSX.Element} Il componente ConfigurationsList.
 *
 * @description
 * Utilizza useEffect per recuperare la lista di configurazioni dal server quando il componente viene montato.
 * La lista di configurazioni viene memorizzata nello stato locale del componente.
 *
 * @function getConfigurationList
 * Effettua una richiesta POST al server per ottenere la lista di configurazioni.
 *
 * @throws {Error} Se c'è un errore durante il recupero delle configurazioni, viene loggato nella console.
 */
import "./ConfigurationsList.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ProfileConfigurationCard from "../ProfileConfigurationCard/ProfileConfigurationCard";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";

const CustomList = styled(List)({
  padding: 0,
  margin: 0,
  width: "100%",
  height: "100%",
  overflowY: "auto",
});

const ConfigurationsList = () => {
  const [configurations, setConfigurations] = useState([]);

  useEffect(() => {
    /**
     * Recupera la lista delle configurazioni dal server.
     * Effettua una richiesta POST all'endpoint `/getConfigurations` con l'email dell'utente.
     * Imposta l'header di autorizzazione con il token memorizzato nel localStorage.
     * Aggiorna lo stato delle configurazioni con i dati ricevuti dalla risposta.
     *
     * @async
     * @function getConfigurationList
     * @returns {Promise<void>} - Una promessa che si risolve quando la lista delle configurazioni è stata recuperata e lo stato è stato aggiornato.
     * @throws {Error} - Se si verifica un errore durante il recupero delle configurazioni, viene loggato nella console.
     */
    async function getConfigurationList() {
      try {
        const response = await fetch(`${BASE_URL}/getConfigurations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ email: localStorage.getItem("email") }),
        });
        const data = await response.json();
        setConfigurations(data.data);
      } catch (error) {
        console.error("Error fetching configurations:", error);
      }
    }
    getConfigurationList();
  }, []);

  return (
    <div className="listContainer">
      <div className="configurationCard">
        {configurations && configurations.length > 0 ? (
          <CustomList>
            {configurations.map((config) => (
              <ListItem
                key={config.idConfigurazione}
                sx={{ padding: 0, borderRadius: 0 }}
              >
                <ProfileConfigurationCard
                  nome={config.nome}
                  descrizione={config.descrizione}
                  stato={config.stato}
                />
              </ListItem>
            ))}
          </CustomList>
        ) : (
          <Typography variant="h6" align="center">
            No configurations found
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ConfigurationsList;
