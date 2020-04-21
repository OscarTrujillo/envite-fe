import React from 'react';
import { CssBaseline, Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import SignUp from './signup/signup.component';
import Login from './login/login.component';
import './auth.component.scss';
import { history } from '../../redux/store/base.store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: {
      width: "100%"
    },
  }),
);

const AuthComponent = () => {
  const classes = useStyles();

  return (
    <ConnectedRouter history={history}>
      <CssBaseline />
      <div className="auth" style={{ minHeight: '100vh' }}>

        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
          >
          <Grid item lg={4} md={6} xs={8} className={classes.fullWidth}>
            <Switch>
              <Route exact path="/auth/signup">
                <SignUp/>
              </Route>
              <Route exact path="/auth/login">
                <Login/>
              </Route>
              {/* default */}
              <Route>
                  <Redirect to="/auth/login" />
              </Route>
            </Switch>  
          </Grid>   
        </Grid> 
      </div>
    </ConnectedRouter>
  )
}

export default AuthComponent;
