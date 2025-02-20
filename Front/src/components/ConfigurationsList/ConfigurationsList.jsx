import "./ConfigurationsList.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ProfileConfigurationCard from "../ProfileConfigurationCard/ProfileConfigurationCard";
import { styled } from "@mui/material/styles";

const CustomList = styled(List)({
  padding: 0,
  margin: 0,
  width: "100%",
  height: "100%",
  overflowY: "auto",
});

const ConfigurationsList = () => {
  return (
    <div className="listContainer">
      <div className="configurationCard">
        <CustomList>
          {Array.from({ length: 38 }).map((_, index) => (
            <ListItem key={index} sx={{ padding: 0, borderRadius: 0 }}>
              <ProfileConfigurationCard key={index} index={index} />
            </ListItem>
          ))}
        </CustomList>
      </div>
    </div>
  );
};

export default ConfigurationsList;
