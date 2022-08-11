import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import './Header.css';
import Logo from '../../assets/logo.png';

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#fa0909', width: '100vw', height: '70px' }}
      >
        <img className="logo" src={Logo} alt="RENOVA BR" />
      </AppBar>
    </Box>
  );
}

export default Header;
