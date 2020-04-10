import React from 'react';
import { Button } from '@material-ui/core';
import { History } from 'history';

interface IHomeProps {
  history: History;
}

function Home(props: IHomeProps) {
  const onclick = () => props.history.push('/site/planner');; 

  return (
    <div className="home">
      <Button
        variant="outlined"
        onClick={onclick}
        type="submit"
      >
        Planner
      </Button>
    </div>
  );

}

export default Home;
