import { Expose } from 'class-transformer';
import "reflect-metadata";

export type TcardPalos = 'bastos' | 'espadas' | 'oros' | 'copas';

export type TcardValors = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'sota' | 'caballo' | 'rey';

export class cardEntity {

    @Expose()
    public valor!: TcardValors;

    @Expose()
    public palo!: TcardPalos;

}
