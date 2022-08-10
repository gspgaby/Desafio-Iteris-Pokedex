import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import './PokemonList.css';
import api from '../../api/api';

function PokemonsList() {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pokemonData, setPokemonData] = useState({});
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
    const response = await api.get(pok.url);
    const newData = {
      name: response.data.forms[0].name,
      img: response.data.sprites.other['official-artwork'].front_default,
      hp: response.data.stats[0].base_stat,
      attack: response.data.stats[1].base_stat,
      defense: response.data.stats[2].base_stat,
      spattack: response.data.stats[3].base_stat,
      spdefense: response.data.stats[4].base_stat,
      speed: response.data.stats[5].base_stat,
      type1: response.data.types[0].type.name,
      type2: response.data.types[1].type.name,
    };
    console.log(newData);
    setPokemonData(newData);
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: '20px', width: '95%' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
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
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        Pokemons
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pokemon
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow
                          key={row.url}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
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
                rowsPerPageOptions={[10]}
                component="div"
                count={pokemon.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Divider orientation="vertical" flexItem />
        <Divider orientation="vertical" flexItem />
        <Grid item xs={5}>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Box sx={{ flexGrow: 1, marginTop: '20px', width: '90%' }}>
              <Paper
                sx={{
                  width: '170px',
                  height: '170px',
                  marginTop: 0,
                  marginLeft: '32%',
                }}
              >
                <img
                  className="photo"
                  src={pokemonData.img}
                  alt={pokemonData.name}
                />
              </Paper>
              <Grid
                container
                spacing={0.5}
                sx={{ marginTop: '20px', marginLeft: '15%' }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '24px',
                  }}
                >
                  {pokemonData.name}
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ fontWeight: 'bold', textAlign: 'center' }}
                >
                  {pokemonData.type1}
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ fontWeight: 'bold', textAlign: 'center' }}
                >
                  {pokemonData.type2}
                </Grid>
              </Grid>
              <Grid container spacing={0.5} sx={{ marginTop: '20px' }}>
                <Grid item xs={12} sx={{ fontWeight: 'bold' }}>
                  HP : {pokemonData.hp}
                </Grid>
                <Grid item xs={12} sx={{ fontWeight: 'bold' }}>
                  ATTACK : {pokemonData.attack}
                </Grid>
                <Grid item xs={12} sx={{ fontWeight: 'bold' }}>
                  SPECIAL ATTACK : {pokemonData.spattack}
                </Grid>
                <Grid item xs={12} sx={{ fontWeight: 'bold' }}>
                  DEFENSE : {pokemonData.defense}
                </Grid>
                <Grid item xs={12} sx={{ fontWeight: 'bold' }}>
                  SPECIAL DEFENSE : {pokemonData.defense}
                </Grid>
                <Grid item xs={12} sx={{ fontWeight: 'bold' }}>
                  SPEED : {pokemonData.speed}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PokemonsList;
