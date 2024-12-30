import { useState } from "react";
import "./Community.css";
import HeaderSwitch from "../../components/HeaderSwitch/HeaderSwitch";
import SearchBar from "../../components/SearchBar/SearchBar";

function Community() {
  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query));
    }
  };

  const data = [
    "Paris",
    "London",
    "New York",
    "Tokyo",
    "Berlin",
    "Buenos Aires",
    "Cairo",
    "Canberra",
    "Rio de Janeiro",
    "Dublin",
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = filterData(searchQuery, data);
  return (
    <>
      <HeaderSwitch />
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
    </>
  );
}

export default Community;
