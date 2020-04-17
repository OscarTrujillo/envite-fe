import { GameEntity } from './../entities/game.entity';
import { IGameInput } from "../redux/actions/game.actions";
import { post } from './api.service';

export const gameService = {
    startGame,
};

function startGame(gameOptions: IGameInput) {
    return post<GameEntity>('/game', JSON.stringify(gameOptions));
}
