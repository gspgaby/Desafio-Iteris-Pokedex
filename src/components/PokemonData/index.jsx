import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import api from '../../api/api';

function PokemonsData() {
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    async function getPokemon() {
      try {
        const response = await api.get(`/${id}`);
        setPokemon(response.data);
      } catch (error) {
        alert(error);
      }
    }
    getPokemon();
  }, []);
  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Box sx={{ flexGrow: 1, marginTop: '20px', width: '90%' }}>
        <Paper
          sx={{
            width: '170px',
            height: '170px',
            marginTop: 0,
            marginLeft: '30%',
          }}
        >
          <img
            className="photo"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </Paper>
        <Grid container spacing={0.5} sx={{ marginTop: '20px' }}>
          <Grid item xs={12} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            {pokemon.name}
          </Grid>
        </Grid>
        <Grid container spacing={0.5} sx={{ marginTop: '20px' }}>
          <Grid item xs={12} sx={{ fontWeight: 'bold' }}>
            vip
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default PokemonsData;
