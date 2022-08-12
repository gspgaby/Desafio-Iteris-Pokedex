import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
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
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    /* busca listagem de pokemoms */
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

  /* paginação */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /* busca dados dos pokemons */
  const handleClick = async (pok) => {
    const response = await api.get(pok.url);
    const newData = {
      id: response.data.game_indices[3].game_index,
      name: response.data.forms[0].name,
      img: response.data.sprites.other['official-artwork'].front_default,
      hp: response.data.stats[0].base_stat,
      attack: response.data.stats[1].base_stat,
      defense: response.data.stats[2].base_stat,
      speed: response.data.stats[5].base_stat,
      type1: response.data.types[0].type.name,
      type2: response.data.types[1]?.type.name,
    };
    console.log(newData);
    setPokemonData(newData);
  };

  const handleClick2 = () => {
    setCounter(counter + 1);
  };

  return (
    <Box sx={{ flexGrow: 1, width: '95%', padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
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
              <TableContainer
                component={Paper}
                sx={{
                  marginTop: '15px',
                  backgroundColor: '#f3bf10',
                  border: '2px solid #000',
                }}
              >
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '18px',
                          border: '1px solid #000',
                        }}
                      >
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
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              fontWeight: 'bold',
                              border: '1px solid #000',
                            }}
                          >
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
        <Divider orientation="vertical" flexItem />
        <Divider orientation="vertical" flexItem />
        <Grid item xs={6}>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Box sx={{ flexGrow: 1, width: '90%' }}>
              {pokemonData.name !== 'pikachu' ? (
                <Button
                  sx={{
                    width: '100%',
                    height: '100%',
                    marginTop: 0,
                    marginLeft: '10%',
                    backgroundColor: '#b4b2b2',
                    borderRadius: '20px',
                  }}
                  disabled
                >
                  <img
                    className="photo"
                    src={pokemonData.img}
                    alt={pokemonData.name}
                  />
                </Button>
              ) : (
                <Button
                  sx={{
                    width: '100%',
                    height: '100%',
                    marginTop: 0,
                    marginLeft: '10%',
                    backgroundColor: '#b4b2b2',
                    borderRadius: '20px',
                    backgroundImage:
                      counter < 3
                        ? ''
                        : 'url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg)',
                  }}
                  onClick={() => handleClick2(pokemonData)}
                >
                  <img
                    className="photo"
                    src={pokemonData.img}
                    alt={pokemonData.name}
                  />
                </Button>
              )}
              <Box
                sx={{
                  backgroundColor: '#b4b2b2',
                  marginLeft: '20px',
                  marginTop: '20px',
                  padding: '5px 20px 5px 20px',
                  width: '100%',
                  borderRadius: '20px',
                }}
              >
                <Grid container spacing={0.5}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: '24px',
                    }}
                  >
                    {pokemonData.id}. {pokemonData.name}
                  </Grid>
                  <Grid container spacing={0.5} sx={{ marginTop: '5px' }}>
                    <Grid
                      item
                      xs={6}
                      sx={{ fontWeight: 'bold', textAlign: 'center' }}
                    >
                      {pokemonData.type1}
                    </Grid>
                    {pokemonData.type2?.length > 0 && (
                      <Grid
                        item
                        xs={6}
                        sx={{ fontWeight: 'bold', textAlign: 'center' }}
                      >
                        {pokemonData.type2}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={0.5} sx={{ marginTop: '20px' }}>
                  <Grid
                    item
                    xs={12}
                    sx={{ fontWeight: 'bold', padding: '10px' }}
                  >
                    HP:{' '}
                    <LinearProgress
                      variant="determinate"
                      value={pokemonData.hp}
                      sx={{
                        display: 'flex',
                        height: '20px',
                        width: '75%',
                        float: 'right',
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ fontWeight: 'bold', padding: '10px' }}
                  >
                    ATTACK:{' '}
                    <LinearProgress
                      variant="determinate"
                      value={pokemonData.attack}
                      sx={{
                        display: 'flex',
                        height: '20px',
                        width: '75%',
                        float: 'right',
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ fontWeight: 'bold', padding: '10px' }}
                  >
                    DEFENSE:{' '}
                    <LinearProgress
                      variant="determinate"
                      value={pokemonData.defense}
                      sx={{
                        display: 'flex',
                        height: '20px',
                        width: '75%',
                        float: 'right',
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ fontWeight: 'bold', padding: '10px' }}
                  >
                    SPEED:{' '}
                    <LinearProgress
                      variant="determinate"
                      value={pokemonData.speed}
                      sx={{
                        display: 'flex',
                        height: '20px',
                        width: '75%',
                        float: 'right',
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PokemonsList;
