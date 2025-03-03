/**
 * Componente Community che mostra una lista di configurazioni della community.
 *
 * @component
 *
 * @returns {JSX.Element} Il componente Community.
 *
 * @example
 * <Community />
 *
 * @description
 * Il componente utilizza gli hook useState e useEffect per gestire lo stato delle configurazioni e per recuperare i dati dal server.
 * Include una barra di ricerca per filtrare le configurazioni in base al nome o alla descrizione.
 * Evidenzia la sottostringa di ricerca nei risultati filtrati.
 *
 * @function
 * @name CommunityViewer
 *
 * @property {Array} configurations - Stato che contiene tutte le configurazioni recuperate dal server.
 * @property {Array} filteredConfigurations - Stato che contiene le configurazioni filtrate in base alla stringa di ricerca.
 * @property {string} searchString - Stato che contiene la stringa di ricerca inserita dall'utente.
 * @property {Object|null} selectedConfig - Stato che contiene la configurazione selezionata dall'utente.
 *
 */
import { useState, useEffect } from "react";
import "./CommunityViewer.css";
import SearchBar from "../SearchBar/SearchBar";
import ConfigurationCard from "../ConfigurationCard/ConfigurationCard";
import { BASE_URL } from "../../constants";

function CommunityViewer() {
  const [configurations, setConfigurations] = useState([]);
  const [filteredConfigurations, setFilteredConfigurations] = useState([]);
  const [searchString, setSearchString] = useState(""); // Stato per la stringa di ricerca
  const [selectedConfig, setSelectedConfig] = useState(null); // Stato per la configurazione selezionata

  useEffect(() => {
    /**
     * Recupera la lista delle configurazioni della community dal server.
     * Effettua una richiesta GET all'endpoint `/getCommunityConfiguration` e aggiorna lo stato con i dati ricevuti.
     *
     * @async
     * @function getConfigurationList
     * @returns {Promise<void>} - Una promessa che si risolve quando i dati sono stati recuperati e lo stato è stato aggiornato.
     * @throws {Error} - Se si verifica un errore durante il recupero dei dati, viene loggato nella console.
     */
    async function getConfigurationList() {
      try {
        const response = await fetch(`${BASE_URL}/getCommunityConfiguration`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setConfigurations(data.data);
        setFilteredConfigurations(data.data); // Mostra tutte le configurazioni inizialmente
      } catch (error) {
        console.error("Error fetching configurations:", error);
      }
    }
    getConfigurationList();
  }, []);

  /**
   * Filtra le configurazioni in base alla stringa di ricerca fornita.
   * Aggiorna lo stato della stringa di ricerca e delle configurazioni filtrate.
   *
   * @param {string} searchString - La stringa di ricerca utilizzata per filtrare le configurazioni.
   */
  const handleFilterConfigurations = (searchString) => {
    setSearchString(searchString); // Aggiorna la stringa di ricerca
    const filtered = configurations.filter(
      (config) =>
        config.nome.toLowerCase().includes(searchString.toLowerCase()) ||
        config.descrizione.toLowerCase().includes(searchString.toLowerCase())
    );
    setFilteredConfigurations(filtered);
  };

  /**
   * Evidenzia una sottostringa all'interno di un testo.
   *
   * @param {string} text - Il testo in cui cercare la sottostringa.
   * @returns {string|JSX.Element[]} - Il testo con la sottostringa evidenziata, se presente.
   */
  const highlightSubstring = (text) => {
    if (!searchString) return text; // Se non c'è una stringa di ricerca, ritorna il testo normale

    const parts = text.split(new RegExp(`(${searchString})`, "gi")); // Dividi il testo in parti, separando la sottostringa
    return parts.map((part, index) =>
      part.toLowerCase() === searchString.toLowerCase() ? (
        <mark key={index}>{part}</mark> // Evidenzia la sottostringa
      ) : (
        part // Mantieni le altre parti come sono
      )
    );
  };

  return (
    <>
      <div className="searchbarContainer">
        <SearchBar
          onChange={(e) => handleFilterConfigurations(e.target.value)}
        />
      </div>
      <div className="gridContainer">
        {filteredConfigurations.map((config) => (
          <div className="item" key={config.idConfigurazione}>
            <ConfigurationCard
              idConfigurazione={config.idConfigurazione}
              nome={config.nome}
              descrizione={highlightSubstring(config.descrizione)}
              username={config.username} // Passa l'username come prop
            />
          </div>
        ))}
      </div>

      {selectedConfig && (
        <div className="selectedConfigDetails">
          <h2>{selectedConfig.nome}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: highlightSubstring(selectedConfig.descrizione), // Evidenzia la sottostringa nella descrizione
            }}
          />
        </div>
      )}
    </>
  );
}

export default CommunityViewer;
