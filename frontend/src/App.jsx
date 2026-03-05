import { Children, Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { Box, Button, Container } from '@mui/material';

const styleButton = {backgroundColor: 'DeepPink', margin:"0 12px"}

function App() {
  return (
    <>
      <Navigation>
      </Navigation>
      <Container style={{width: '100%', display: "flex", justifyContent: "center"}}>
        <Button variant='contained' size="large" sx={styleButton}> Button1</Button>
        <Button variant='contained' size="large" sx={styleButton}>Button2</Button>
      </Container>
    </>
  );
}

export default App;
