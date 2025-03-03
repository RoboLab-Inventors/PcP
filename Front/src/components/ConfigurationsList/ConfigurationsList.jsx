import "./ConfigurationsList.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
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
        <CustomList>
          {configurations.map((config) => (
            <ListItem key={config.idConfigurazione} sx={{ padding: 0, borderRadius: 0 }}>
              <ProfileConfigurationCard
                idConfigurazione={config.idConfigurazione}
                nome={config.nome}
                descrizione={config.descrizione}
                stato={config.stato}
              />
            </ListItem>
          ))}
        </CustomList>
      </div>
    </div>
  );
};

export default ConfigurationsList;