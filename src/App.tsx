import React from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import AuthComponent from './components/auth/auth.component';
import SiteComponent from './components/site/site.component';
import AuthorizedRoute from './components/loginRequiredRoute.component';
import NotLogedInRoute from './components/notLogedInRoute.component';

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
            <NotLogedInRoute path="/auth">
              <AuthComponent history={history}/>
            </NotLogedInRoute>
            <AuthorizedRoute path="/site">
              <SiteComponent history={history}/>
            </AuthorizedRoute>
            <Route>
              <Redirect to="/auth" />
            </Route>
          </Switch>           
        </Container>
      </div>
    </ConnectedRouter>
  )
}

export default App;
