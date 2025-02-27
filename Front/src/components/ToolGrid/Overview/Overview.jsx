import "./Overview.css";
<<<<<<< HEAD
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper"
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  backdropFilter: 'brightness(0.5)',
  ...theme.typography.body1,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.fontColor.main,
  border: '1px solid var(--primary-color-secondary)',
  borderRadius: 0,
}));

const Overview = ({items}) => {

  return (
    <Box className="componentDetailsContainer" sx={{ overflowY: 'auto' }}>
      <Grid container spacing={0} className="componentDetailsGrid">
        {items.map((item, index) => (
          <Grid item size={2} key={index}>
            <Item>{item.label}:{parseFloat(item.value).toFixed(2)}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
=======
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
>>>>>>> 0b27615a0e437445f659d75e5f87bb954c3ab230
  );
};

export default Overview;
