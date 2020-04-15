import React, { Dispatch } from 'react';
import { Button } from '@material-ui/core';
import { History } from 'history';
import { logout } from '../../../redux/actions/auth.actions';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    logout: () => dispatch(logout())
  };
}

interface IHomeProps {
  history: History;
}

type THomeProps = IHomeProps & ReturnType<typeof mapDispatchToProps>;

function Connectedome(props: THomeProps) {
  const onclickPlanner = () => props.history.push('/site/planner');
  const onclickLogout = () => { 
    props.logout();
    props.history.push('/');
  }  
  return (
    <div className="home">
      <Button
        variant="outlined"
        onClick={onclickPlanner}
        type="submit"
      >
        Planner
      </Button>
      <Button
        variant="outlined"
        onClick={onclickLogout}
        type="submit"
      >
        Logout
      </Button>
    </div>
  );

}

const Home = connect(
  null,
  mapDispatchToProps
)(Connectedome)


export default Home;
