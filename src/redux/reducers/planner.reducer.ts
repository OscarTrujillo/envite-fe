import { TroundTimeOptions } from './../../entities/game.entity';
import { IplannerAction } from '../actions/planner.actions';
import { plannerConstants } from '../store/constants.store';
import { TtableSizeOptions } from '../../entities/game.entity';

export interface IPlannerReducer {
  planner: IPlannerState;
}

export interface IPlannerState {
  tableSize: TtableSizeOptions;
  roundTime: TroundTimeOptions;
}

const initialState: IPlannerState = {
  tableSize: 4,
  roundTime: "30s",
};

export default function(state = initialState, action: IplannerAction) {
  const { type } = action;
  switch (type) {
    case plannerConstants.SELECT_PLAYER_NUMBER:
      return { ...state, tableSize: action.tableSize };
    case plannerConstants.SELECT_ROUND_TIME:
      return { ...state, roundTime: action.roundTime };
    default:
      return state;
  }
}