/**
 * Il componente Overview visualizza una griglia di elementi con etichette e valori.
 * 
 * @component
 * @example
 * const items = [
 *   { label: 'Elemento 1', value: 10.123 },
 *   { label: 'Elemento 2', value: 20.456 }
 * ];
 * return <Overview items={items} />;
 * 
 * @param {Object[]} items - Array di elementi da visualizzare.
 * @param {string} items[].label - L'etichetta dell'elemento.
 * @param {number} items[].value - Il valore dell'elemento.
 * 
 * @returns {JSX.Element} Il componente Overview renderizzato.
 */
import { styled } from "@mui/material/styles";
import {Paper, Grid2, Box} from "@mui/material"

import "./Overview.css";

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
