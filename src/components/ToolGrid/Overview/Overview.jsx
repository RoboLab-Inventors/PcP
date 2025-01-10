import "./Overview.css";
import "../ToolGrid.css";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Overview = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));
  return (
    <div className="componentDetailsContainer">
      <Grid container spacing={2}>
        <Grid size="auto">
          <Item>size=8</Item>
        </Grid>
        <Grid size="auto">
          <Item>size=4</Item>
        </Grid>
        <Grid size="auto">
          <Item>size=4</Item>
        </Grid>
        <Grid size="auto">
          <Item>size=8</Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default Overview;
