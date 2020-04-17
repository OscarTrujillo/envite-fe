import { gameConstants } from './../store/constants.store';
import { GameEntity, TtableSizeOptions } from './../../entities/game.entity';
import { gameService } from './../../services/game.service';
import { AppThunk } from './base.actions';

export interface IGameAction {
    type: string;
    game?: GameEntity;
    error?: string;
}

export interface IGameInput { roundtime: string, numberOfPlayers: TtableSizeOptions }

export const startGame = (gameInput: IGameInput): AppThunk => async dispatch => {
    return gameService.startGame(gameInput)
        .then(
            game => { 
                dispatch(success(game));
            },
            error => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
            }
        );
        
    function success(game?: GameEntity): IGameAction{ return { type: gameConstants.GAME_CREATE_SUCCESS, game } }
    function failure(error?: string): IGameAction { return { type: gameConstants.GAME_CREATE_FAILURE, error } }
    // TODO: add request 
};  