import React from 'react';
import { Button, TextField } from '@material-ui/core';
import Logout from '../../shared/logout.component';
import { history } from '../../../redux/store/base.store';
import './home.component.scss';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IGetGameInput, getGame } from '../../../redux/actions/game.actions';
import { connect } from "react-redux";

function homeActions(dispatch: ThunkDispatch<any, any, AnyAction>) {
  return {
    getGame: (game: IGetGameInput) => dispatch(getGame(game))
  };
}

const ConnectedHome = ( props: ReturnType<typeof homeActions> ) => {
  let textFieldValue = ''

  const onclickPlanner = () => history.push('/site/planner');
  const onclickStartGame = () => {
    props.getGame({_id: textFieldValue});
  };

  const _handleTextFieldChange = (e: any) => {
    textFieldValue = e.target.value;
  };

  return (
    <div className="home">
      <div>
        <Button
          variant="outlined"
          onClick={onclickPlanner}
          type="submit"
          >
          Crear partida
        </Button>
        <Logout/>
      </div>
      <div className="form">
        <TextField id="game-input" label="Game id" onChange={_handleTextFieldChange} />
        <Button
          variant="outlined"
          onClick={onclickStartGame}
          type="submit"
          >
          Unirte a partida
        </Button>
      </div>
    </div>
  );

}

const Home = connect(null, homeActions)(ConnectedHome);

export default Home;
