import React, { Component } from 'react';
import Planner from './components/planner/planner';
import { CssBaseline, Container } from '@material-ui/core';
import './App.scss';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor() {
    super({});
    this.state = {
      response: false,
      endpoint: "http://localhost:3000"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state as any;
    const socket = socketIOClient(endpoint);
    socket.on('connect', () => {
      console.log('Connected');
    });
  }

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
