import React from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import './site.component.scss';
import Home from './home/home.component';
import Planner from './planner/planner.componet';
import { history } from '../../redux/store/base.store';
import Board from './board/board.component';
import Game from './game/game.component';

const SiteComponent = () => {
  return (
    <ConnectedRouter history={history}>
      <CssBaseline />
      <div className="site">
        <Container >
          <Switch>
            <Route path="/site/home">
              <Home/>
            </Route>
            <Route exact path="/site/planner">
              <Planner/>
            </Route> 
            <Route exact path="/site/board">
              <Board/>
            </Route> 
            <Route exact path="/site/game">
              <Game/>
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
