import React from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import SignUp from './signup/signup.component';
import Login from './login/login.component';
import './auth.component.scss';

interface AuthProps {
  history: History;
}

const AuthComponent = ({ history }: AuthProps) => {
  return (
    <ConnectedRouter history={history}>
      <CssBaseline />
      <div className="auth" style={{ minHeight: '100vh' }}>
        {/* <Container maxWidth="lg">
                   
        </Container> */}
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >
            <Grid item xs={4}>
                <Switch>
                    <Route exact path="/auth/signup">
                    <   SignUp history={history}/>
                    </Route>
                        <Route exact path="/auth/login">
                    <Login/>
                    </Route>
                    {/* default */}
                    <Route>
                        <Redirect to="/auth/signup" />
                    </Route>
                </Switch>  
            </Grid>   
        </Grid> 
      </div>
    </ConnectedRouter>
  )
}

export default AuthComponent;
