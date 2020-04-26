import { TroundTimeOptions } from '../../entities/game.entity';
import { plannerConstants } from './../store/constants.store';
import { TtableSizeOptions } from '../../entities/game.entity';

export interface IplannerAction {
  type: string;
  tableSize?: TtableSizeOptions;
  roundTime?: TroundTimeOptions;
}

export function selectPlayerNumber(tableSize: TtableSizeOptions): IplannerAction {
  return { 
    type: plannerConstants.SELECT_PLAYER_NUMBER, tableSize
  };
}

export function selectRoundTime(roundTime: TroundTimeOptions): IplannerAction {
  return { 
    type: plannerConstants.SELECT_ROUND_TIME, roundTime
  };
}