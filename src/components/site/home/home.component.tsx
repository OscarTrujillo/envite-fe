import React, { Dispatch } from 'react';
import { Button } from '@material-ui/core';
import { History } from 'history';
import Logout from '../../shared/logout.component';

interface IHomeProps {
  history: History;
}

function Home(props: IHomeProps) {
  const onclickPlanner = () => props.history.push('/site/planner');

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
