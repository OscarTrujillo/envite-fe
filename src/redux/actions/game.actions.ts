import { gameConstants } from './../store/constants.store';
import { GameEntity, TtableSizeOptions } from './../../entities/game.entity';
import { gameService } from './../../services/game.service';
import { AppThunk } from './base.actions';
import { history } from '../store/base.store';
import { socket } from '../../socket/socket-client';

export interface IGameAction {
    type: string;
    game?: GameEntity;
    error?: string;
}

export interface IGameInput { roundTime: string, numberOfPlayers: TtableSizeOptions }

// create game
export const startGame = (gameInput: IGameInput): AppThunk => async dispatch => {
    return gameService.startGame(gameInput)
        .then(
            game => { 
                dispatch(success(game));
                socket.connect();
                history.push('/site/board?id=' + game.id);
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
    // return gameService.startGame({ roundtime: '30s', numberOfPlayers: 4  })
    return gameService.getGame(getGameInput)
        .then(
            game => { 
                socket.connect();
                dispatch(success(game));
                if (window.location.pathname !== '/site/game' && window.location.pathname !== '/site/board') {
                    history.push('/site/board?id=' + game.id);
                }
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


export function gameDataChange(game: GameEntity): IGameAction {
    return { 
      type: gameConstants.NEW_SEAT, game: game
    };
}