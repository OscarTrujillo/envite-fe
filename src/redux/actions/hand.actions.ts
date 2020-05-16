import { handConstants } from './../store/constants.store';
import { cardEntity } from './../../entities/card.entity';

export interface IhandAction {
    type: string;
    myHand?: cardEntity[];
}

export function myCardsChange(cards: cardEntity[]): IhandAction {
    return { 
      type: handConstants.MY_CARDS_CHANGE, myHand: cards
    };
}