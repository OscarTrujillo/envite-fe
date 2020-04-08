import React from 'react';
import Planner from './components/planner/planner';
import Home from './components/home/home';
import { CssBaseline, Container } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import Login from './components/login/login';
import SignUp from './components/signup/signup';

interface AppProps {
  history: History;
}

const App = ({ history }: AppProps) => {
  return (
    <ConnectedRouter history={history}>
      <CssBaseline />
      <div className="app">
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/signup">
              <SignUp/>
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route path="/home">
              <Home/>
            </Route>
            <Route exact path="/planner">
              <Planner/>
            </Route>
            {/* default */}
            <Route>
              <Redirect to="/planner" />
            </Route>
          </Switch>           
        </Container>
      </div>
    </ConnectedRouter>
  )
}

export default App;
