import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './App.css';
import TextFileData from './TextFileData'
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LightSwitch from './LightSwitch';
import { useState } from 'react';


export default function App() {

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
};

  const themecolor = createTheme({
    palette: {
      mode: 'light',
    },
  });

  if (isChecked) {
    themecolor.palette.mode = 'dark';
  } else {    
    themecolor.palette.mode = 'light';
  }

  return (
     <ThemeProvider  theme={themecolor}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CardHeader
            avatar={
              <Avatar alt="MandMs" src="logo.png" />
            }
            title="Link Graba"
          />
          <LightSwitch checked={isChecked} onChange={handleChange} />

        </Box>
        <Box sx={{ my: 4 }}>


          <TextFileData />
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      M&Ms
      {new Date().getFullYear()}.
    </Typography>
  );
}
