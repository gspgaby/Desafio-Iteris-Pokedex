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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    async function loadPokemon(limit = 1000, offset = 0) {
      try {
        const response = await api.get(`/?limit=${limit}&offset=${offset}`);
        setPokemon(response.data.results);
      } catch (error) {
        alert(error);
      }
    }
    loadPokemon();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = async (pok) => {
    const response = await api.get(pok);
    console.log(response.data);
  };

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Box
        sx={{
          borderRadius: '10px',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Pokemons</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pokemon
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => handleClick(row)}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={pokemon.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Grid>
  );
}

export default PokemonsList;
