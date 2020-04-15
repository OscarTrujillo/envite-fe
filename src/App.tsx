import React, { Component } from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import AuthComponent from './components/auth/auth.component';
import SiteComponent from './components/site/site.component';
import AuthorizedRoute from './components/loginRequiredRoute.component';
import NotLogedInRoute from './components/notLogedInRoute.component';
import { persistor } from './redux/store/base.store';

interface AppProps {
  history: History;
}

interface AppState {
  rehydrated: boolean;
}

// const App = ({ history }: AppProps) => {
export default class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = { rehydrated: false }
  }

  componentWillMount(){
    console.log('will');
    persistor.subscribe( () => {
      console.log('persistor');
      this.setState({ rehydrated: true })
    })
  }

  render() {
    if(!this.state.rehydrated){
      return <div>Loading...</div>
    }
    return (
      <ConnectedRouter history={this.props.history}>
        <CssBaseline />
        <div className="app">
          <Container maxWidth="lg">
            <Switch>
              <NotLogedInRoute path="/auth">
                <AuthComponent history={this.props.history}/>
              </NotLogedInRoute>
              <AuthorizedRoute path="/site">
                <SiteComponent history={this.props.history}/>
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