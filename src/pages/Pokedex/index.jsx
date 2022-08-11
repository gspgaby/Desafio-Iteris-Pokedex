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
        width: '65%',
        marginLeft: '15%',
        backgroundColor: '#fa0909',
        borderRadius: '40px',
        marginTop: '15px',
      }}
    >
      <Box sx={{ flexGrow: 1, marginTop: '20px', width: '95%' }}>
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
