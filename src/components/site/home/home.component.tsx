import React from 'react';
import { Button } from '@material-ui/core';
import Logout from '../../shared/logout.component';
import { history } from '../../../redux/store/base.store';

function Home() {
  const onclickPlanner = () => history.push('/site/planner');

  return (
    <div className="home">
      <Button
        variant="outlined"
        onClick={onclickPlanner}
        type="submit"
      >
        Planner
      </Button>
      <Logout/>
    </div>
  );

}

export default Home;
