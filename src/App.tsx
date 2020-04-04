import React, { Component } from 'react';
import Planner from './components/planner/planner';
import { CssBaseline, Container } from '@material-ui/core';
import './App.scss';

class App extends Component {
  render() {
    return (
        <div className="App">
        <CssBaseline />
        <Container maxWidth="lg">
          <Planner/>
        </Container>
      </div>
    );
  }
}

export default App;
