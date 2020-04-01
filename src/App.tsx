import React from 'react';
import Planner from './components/planner/planner';
import { CssBaseline, Container } from '@material-ui/core';
import './App.scss';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="lg">
        <Planner/>
      </Container>
    </div>
  );
}

export default App;
