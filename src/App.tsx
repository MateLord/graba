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
import { useState } from 'react';
import Switch from '@mui/material/Switch';


export default function App() {

  const light = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const dark = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [isChecked, setIsChecked] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(light);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (isChecked) {
      setSelectedTheme(light);
    } else {    
      setSelectedTheme(dark);
    }
};


 

  return (
     <ThemeProvider  theme={selectedTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ display: "flex",
    justifyContent: "space-between" }}>
          <CardHeader
            avatar={
              <Avatar alt="MandMs" src="logo.png" />
            }
            title="Link Graba"
          />
          <Switch checked={isChecked} onChange={handleChange} />
        
        </Box>
        <Box sx={{ my: 6 }}>


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
