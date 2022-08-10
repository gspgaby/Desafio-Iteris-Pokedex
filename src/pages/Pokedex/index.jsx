import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PokemonsList from '../../components/PokemonsList';
import PokemonsData from '../../components/PokemonData';

function Pokedex() {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      sx={{
        minHeight: '90vh',
        minWidth: '95vh',
        marginLeft: '45vh',
        backgroundColor: '#fa0909',
        borderRadius: '40px',
      }}
    >
      <Box sx={{ flexGrow: 1, marginTop: '20px', width: '95%' }}>
        <Grid container spacing={0.5}>
          <Grid item xs={6}>
            <PokemonsList />
          </Grid>
          <Grid item xs={6}>
            {/* <PokemonsData /> */}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Pokedex;
