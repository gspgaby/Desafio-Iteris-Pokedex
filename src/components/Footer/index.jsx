import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <footer>
      <Typography sx={{ textAlign: 'center', marginTop: '12px' }}>
        &copy; {new Date().getFullYear} Desafio Somos - Gabriella dos Santos
        Pereira
      </Typography>
    </footer>
  );
}

export default Footer;
