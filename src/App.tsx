import React from 'react';
import logo from './logo.svg';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import './App.css';
import TextFileData from './TextFileData'

export default function App() {
  return (
    <Container maxWidth="sm">
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Link Graba
      </Typography>
      <TextFileData />
      <Copyright />
    </Box>
  </Container>
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
