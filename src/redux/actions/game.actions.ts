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

export interface IGetGameInput { _id: string }

export const getGame = (getGameInput: IGetGameInput): AppThunk => async dispatch => {
    console.log('get', getGameInput);
    // return gameService.startGame({ roundtime: '30s', numberOfPlayers: 4  })
    return gameService.getGame(getGameInput)
        .then(
            game => { 
                dispatch(success(game));
            },
            error => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
            }
        );
        
    function success(game?: GameEntity): IGameAction{ return { type: gameConstants.GAME_GET_SUCCESS, game } }
    function failure(error?: string): IGameAction { return { type: gameConstants.GAME_GET_FAILURE, error } }
    // TODO: add request 
};  