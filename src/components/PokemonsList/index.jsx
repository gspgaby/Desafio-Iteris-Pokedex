import { useState, useEffect } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import api from '../../api/api';

function PokemonsList() {
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await api.get('/');
        setPokemon(response.data);
      } catch (error) {
        alert(error);
      }
    }
    loadPokemon();
  }, []);
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Pokemons
        </ListSubheader>
      }
    >
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary="" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default PokemonsList;
