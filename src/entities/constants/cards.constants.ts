// import { ConstantIconEntity, ConstantGroup } from './base.constants';

// const ORO_1 = 'oro_1';

// const ORO_1_OBJ = new ConstantIconEntity({
//   value: ORO_1,
//   name: ORO_1,
// });

// const CARDS: ConstantIconEntity[] = [ORO_1_OBJ];

// export class CardsConstants extends ConstantGroup<ConstantIconEntity> {
//     public list(): ConstantIconEntity[] {
//         return CARDS;
//     }

//     static get ORO_1_OBJ() {
//         return ORO_1_OBJ;
//     }

// }

export const cardsConstants = {
    back: 'back',
    oro: {
        1: 'oro_1',
        11: 'oro_caballo',
    },
    copa: {
        1: 'copa_1',
        11: 'copa_caballo',
    },
    espada: {
        1: 'espada_1',
        11: 'espda_caballo',
    },
    basto: {
        1: 'basto_1',
        11: 'basto_caballo',
    }
};
