import { GameEntity } from './../entities/game.entity';
import { IGameInput, IGetGameInput } from "../redux/actions/game.actions";
import { post, get } from './api.service';

export const gameService = {
    startGame,
    getGame,
};

function startGame(gameOptions: IGameInput) {
    return post<GameEntity>('/game', JSON.stringify(gameOptions), GameEntity);
}

function getGame(gameOptions: IGetGameInput) {
    return get<GameEntity>('/game', gameOptions, GameEntity);
}
