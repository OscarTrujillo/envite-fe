import { handConstants } from './../store/constants.store';
import { IhandAction } from './../actions/hand.actions';
import { cardEntity } from './../../entities/card.entity';

export interface IHandState {
    myHand: cardEntity[];
}
const initialState: cardEntity[] = [];

export function handState(state = initialState, action: IhandAction) {
    const { type } = action;
    switch (type) {
      case handConstants.MY_CARDS_CHANGE:
        return { ...state, myHand: action.myHand };
      default:
        return state;
    }
}