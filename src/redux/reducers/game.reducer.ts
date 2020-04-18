import { GameEntity } from './../../entities/game.entity';
import { gameConstants } from './../store/constants.store';
import { IGameAction } from "../actions/game.actions";

export interface IGameState {
    game: GameEntity;
}  
const initialState = new GameEntity();

export function gameSate(state = initialState, action: IGameAction) {
    switch (action.type) {
      case gameConstants.GAME_CREATE_REQUEST:
      case gameConstants.GAME_GET_REQUEST:
        return {};
      case gameConstants.GAME_CREATE_SUCCESS:
      case gameConstants.GAME_GET_SUCCESS:
        return {
            ...state,
            game: action.game,
        };
      case gameConstants.GAME_CREATE_FAILURE:
      case gameConstants.GAME_GET_FAILURE:
        return {};
      default:
        return state
    }
} 