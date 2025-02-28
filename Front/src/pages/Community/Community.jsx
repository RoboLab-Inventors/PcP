import { useState, useEffect } from "react";
import "./Community.css";
import HeaderSwitch from "../../components/HeaderSwitch/HeaderSwitch";
import SearchBar from "../../components/SearchBar/SearchBar";
import ConfigurationCard from "../../components/ConfigurationCard/ConfigurationCard";
import { BASE_URL } from "../../constants";

function Community() {
  const [configurations, setConfigurations] = useState([]);
  const [filteredConfigurations, setFilteredConfigurations] = useState([]);
  const [searchString, setSearchString] = useState(""); // Stato per la stringa di ricerca
  const [selectedConfig, setSelectedConfig] = useState(null); // Stato per la configurazione selezionata

  useEffect(() => {
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

  const handleFilterConfigurations = (searchString) => {
    setSearchString(searchString); // Aggiorna la stringa di ricerca
    const filtered = configurations.filter(
      (config) =>
        config.nome.toLowerCase().includes(searchString.toLowerCase()) ||
        config.descrizione.toLowerCase().includes(searchString.toLowerCase())
    );
    setFilteredConfigurations(filtered);
  };

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
      <HeaderSwitch />

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

export default Community;
