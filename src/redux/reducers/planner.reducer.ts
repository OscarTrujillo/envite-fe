import { EPlannerActionTypes } from '../actions/planner.actions';
import { IplannerAction } from '../actions/planner.actions';

export interface IPlannerReducer {
  planner: IPlannerState;
}

export interface IPlannerState {
  tableSize: 4 | 6 | 8;
}

const initialState: IPlannerState = {
  tableSize: 4
};

export default function(state: IPlannerState = initialState, action: IplannerAction) {
  const { type } = action;
  switch (type) {
    case EPlannerActionTypes.SELECT_PLAYER_NUMBER:
      return { ...state, tableSize: action.payload };
    default:
      return state;
  }
}