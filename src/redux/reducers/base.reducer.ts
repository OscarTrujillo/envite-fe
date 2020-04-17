import { IGameState, startGameReducer } from './game.reducer';
import planner, { IPlannerState } from './planner.reducer';
import { registration, authentication, IAuthState } from './auth.reducer';
import { combineReducers } from "redux";
import { History } from 'history'
import { connectRouter } from 'connected-react-router'

export interface IAppState {
    registration: any;
    authentication: IAuthState;
    planner: IPlannerState;
    game: IGameState;
}

  
const rootReducer = (history: History) =>  combineReducers({
    router: connectRouter(history),
    registration,
    authentication,
    planner,
    startGameReducer
});

// export interface State {
//     count: number
//     router: RouterState
// }
export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;