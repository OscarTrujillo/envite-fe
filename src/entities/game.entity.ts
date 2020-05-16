import { UserEntity } from './user.entity';
import { Expose, Type } from 'class-transformer';
import "reflect-metadata";

// export class PlayerArray extends Array<Player> {
//     // custom array functions ...
// }

export type TroundTimeOptions = '30s' | '60s' | '90s' | '180s' | 'no-limit';
// Running, waitingForPlayers, Ready
export type TgameStatus = 'Running' | 'waitingForPlayers' | 'Ready';

export type TtableSizeOptions = 4 | 6 | 8;

export class GameEntity {

    @Expose({ name: "_id" })
    public id!: string;

    @Expose()
    public roundTime!: TroundTimeOptions;

    @Expose()
    public numberOfPlayers!: TtableSizeOptions;

    @Type(() => UserEntity)
    @Expose()
    public table!: UserEntity[];

    @Expose()
    public gameStatus!: TgameStatus;

    @Expose()
    public createdBy!: string;

    @Expose()
    public gamesToWin!: number;

    // @Type(() => Player)
    // @Expose()
    // public teamA: PlayerArray;
}
