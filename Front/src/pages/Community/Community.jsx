import "./Community.css";
import HeaderSwitch from "../../components/HeaderSwitch/HeaderSwitch";
import SearchBar from "../../components/SearchBar/SearchBar";
import Grid from "@mui/material/Grid2";
import ConfigurationCard from "../../components/ConfigurationCard/ConfigurationCard";

function Community() {
  return (
    <>
      <HeaderSwitch />

      <div className="searchbarContainer">
        <SearchBar />
      </div>
      <div className="gridContainer">
        <div className="item">
          <ConfigurationCard />
        </div>
        <div className="item">
          <ConfigurationCard />
        </div>
        <div className="item">
          <ConfigurationCard />
        </div>
        <div className="item">
          <ConfigurationCard />
        </div>
        <div className="item">
          <ConfigurationCard />
        </div>
        <div className="item">
          <ConfigurationCard />
        </div>
        <div className="item">
          <ConfigurationCard />
        </div>
        <div className="item">
          <ConfigurationCard />
        </div>
        <div className="item">
          <ConfigurationCard />
        </div>
      </div>
      <div></div>
      {/*

<Grid container spacing={4} alignItems="start">
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ConfigurationCard />
          </Grid>
        </Grid>


      <div
        style={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 20,
        }}
      >
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div style={{ padding: 3 }}>
          {dataFiltered.map((d) => (
            <div
              className="text"
              style={{
                padding: 5,
                justifyContent: "normal",
                fontSize: 20,
                color: "blue",
                margin: 1,
                width: "250px",
                BorderColor: "green",
                borderWidth: "10px",
              }}
              key={d.id}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
      */}
    </>
  );
}

export default Community;
