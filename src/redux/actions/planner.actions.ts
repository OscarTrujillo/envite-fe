
export enum EPlannerActionTypes {
  SELECT_PLAYER_NUMBER = 'SELECT_PLAYER_NUMBER',
}

export interface IplannerAction {
  type: EPlannerActionTypes.SELECT_PLAYER_NUMBER;
  payload: 4|6|8;
}

export function selectPlayerNumber(payload: 4|6|8): IplannerAction {
    return { 
        type: EPlannerActionTypes.SELECT_PLAYER_NUMBER, payload
    };
}