import { GameEntity } from './../../entities/game.entity';
import { gameConstants } from './../store/constants.store';
import { IGameAction } from "../actions/game.actions";

export interface IGameState {
    game: GameEntity;
}  
const initialState = new GameEntity();

export function startGameReducer(state = initialState, action: IGameAction) {
    switch (action.type) {
      case gameConstants.GAME_CREATE_REQUEST:
        return {};
      case gameConstants.GAME_CREATE_SUCCESS:
        return {
            ...state,
            game: action.game,
        };
      case gameConstants.GAME_CREATE_FAILURE:
        return {};
      default:
        return state
    }
} 