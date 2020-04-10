import React from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import './site.component.scss';
import Home from './home/home.component';
import Planner from './planner/planner.componet';

interface SiteProps {
  history: History;
}

const SiteComponent = ({ history }: SiteProps) => {
  return (
    <ConnectedRouter history={history}>
      <CssBaseline />
      <div className="site">
        <Container >
          <Switch>
            <Route path="/site/home">
              <Home history={history}/>
            </Route>
            <Route exact path="/site/planner">
              <Planner/>
            </Route> 
            {/* default */}
            <Route>
              <Redirect to="/site/home" />
            </Route>
          </Switch>           
        </Container>
      </div>
    </ConnectedRouter>
  )
}

export default SiteComponent;
