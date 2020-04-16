import React, { Component } from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import { ConnectedRouter } from 'connected-react-router';
import AuthComponent from './components/auth/auth.component';
import SiteComponent from './components/site/site.component';
import AuthorizedRoute from './components/shared/loginRequiredRoute.component';
import NotLogedInRoute from './components/shared/notLogedInRoute.component';
import { persistor, history } from './redux/store/base.store';

interface AppState {
  rehydrated: boolean;
}

// const App = ({ history }: AppProps) => {
export default class App extends Component<{}, AppState> {

  constructor() {
    super({});
    this.state = { rehydrated: false }
  }

  componentWillMount(){
    persistor.subscribe( () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {
    if(!this.state.rehydrated){
      return <div>Loading...</div>
    }
    return (
      <ConnectedRouter history={history}>
        <CssBaseline />
        <div className="app">
          <Container>
            <Switch>
              <NotLogedInRoute path="/auth">
                <AuthComponent/>
              </NotLogedInRoute>
              <AuthorizedRoute path="/site">
                <SiteComponent/>
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
}