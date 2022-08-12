import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PokemonsList from '../../components/PokemonsList';

function Pokedex() {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      sx={{
        minHeight: '70vh',
        marginLeft: '30vh',
        backgroundColor: '#fa0909',
        borderRadius: '40px',
        marginTop: '50px',
      }}
    >
      <Box sx={{ flexGrow: 1, width: '95%' }}>
        <Grid container spacing={0.5}>
          <Grid item xs={12}>
            <PokemonsList />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Pokedex;
