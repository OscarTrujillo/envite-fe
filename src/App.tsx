import React, { Component } from 'react';
import Planner from './components/planner/planner';
import Home from './components/home/home';
import { CssBaseline, Container } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <CssBaseline />
          <Container maxWidth="lg">
            <Switch>
              <Route
                path="/home">
                  <Home/>
              </Route>
              <Route
                exact
                path="/planner">
                <Planner/>
              </Route>
              {/* default */}
              <Route>
                <Redirect to="/home" />
              </Route>
            </Switch>           
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
