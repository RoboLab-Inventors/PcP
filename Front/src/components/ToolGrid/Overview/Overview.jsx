import "./Overview.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper"
import Grid2 from '@mui/material/Grid2';
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
      <Grid2 container spacing={0} className="componentDetailsGrid2">
        {items.map((item, index) => (
          <Grid2 size={2} key={index}>
            <Item>{item.label}:{parseFloat(item.value).toFixed(2)}</Item>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Overview;
