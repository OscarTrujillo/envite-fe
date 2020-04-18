import React from 'react';
import { connect } from "react-redux";
import { IPlannerReducer } from '../../../redux/reducers/planner.reducer';
import TableSizeSelector from './tableSizeSelector/tableSizeSelector.component';
import Table from './table/table.component';
import { Grid, Button } from '@material-ui/core';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from 'redux';
import { IGameInput, startGame } from '../../../redux/actions/game.actions';
import RoundTimeSelector from './roundTimeSelector/roundTimeSelector.component';
import './planner.component.scss';

const plannerProps = (state: IPlannerReducer) => {
  return { 
    tableSize: state.planner.tableSize,
    roundTime: state.planner.roundTime,
  }
}

function plannerActions(dispatch: ThunkDispatch<any, any, AnyAction>) {
  return {
    startGame: (game: IGameInput) => dispatch(startGame(game))
  };
}

type TConnectedPlannerProps = ReturnType<typeof plannerActions> & ReturnType<typeof plannerProps>;

const ConnectedSize = (props: TConnectedPlannerProps ) => {
  const onClickStartGame = () => {
    props.startGame({ roundtime: props.roundTime, numberOfPlayers: props.tableSize  })
  }

  return(
    <div className="planner">
      <h1>
        Configuración de la partida
      </h1>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <p>size</p>
          <TableSizeSelector/>
          <p>time</p>
          <RoundTimeSelector/>
        </Grid>
        <Grid item xs={10}>
          <Table/>
        </Grid>
      </Grid>
      <div className="button-container">
        <Button
          variant="outlined"
          type="submit"
          onClick={onClickStartGame}
          >
          Crear partida
        </Button>
      </div>
    </div>
  )
};

const Planner = connect(plannerProps, plannerActions)(ConnectedSize);

export default Planner;