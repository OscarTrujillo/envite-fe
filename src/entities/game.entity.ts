import { Expose } from 'class-transformer';


// export class PlayerArray extends Array<Player> {
//     // custom array functions ...
// }

export type TroundTimeOptions = '30s' | '60s' | '90s' | '180s' | 'no-limit';

export type TtableSizeOptions = 4 | 6 | 8;

export class GameEntity {

    @Expose({ name: "_id" })
    public id!: string;

    @Expose({ name: "roundtime" })
    public roundTime!: TroundTimeOptions;

    @Expose()
    public numberOfPlayers!: TtableSizeOptions;

    // @Type(() => Player)
    // @Expose()
    // public teamA: PlayerArray;
}
