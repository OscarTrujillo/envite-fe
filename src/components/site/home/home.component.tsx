import React from 'react';
import { Button } from '@material-ui/core';
import { History } from 'history';

interface IHomeProps {
  history: History;
}

function Home(props: IHomeProps) {
  const onclickPlanner = () => props.history.push('/site/planner');
  const onclickLogout = () => console.log('logout');

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

export default Home;
