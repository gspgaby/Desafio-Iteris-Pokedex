import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import api from '../../api/api';

function PokemonsList() {
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await api.get('/');
        setPokemon(response.data.results);
      } catch (error) {
        alert(error);
      }
    }
    loadPokemon();
  }, []);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      sx={{ marginTop: '10vh' }}
    >
      <Box
        sx={{
          borderRadius: '10px',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <Paper sx={{ padding: '30px' }}>
          <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
            <Table size="small" aria-label="a dense table">
              <TableHead sx={{ backgroundColor: '#fa0909' }}>
                <TableRow>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                    Pokemons
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pokemon.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" />
        </Paper>
      </Box>
    </Grid>
  );
}

export default PokemonsList;
