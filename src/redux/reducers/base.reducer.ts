import planner from './planner.reducer';
import { registration } from './auth.reducer';
import { combineReducers } from "redux";
import { History } from 'history'
import { connectRouter } from 'connected-react-router'

const rootReducer = (history: History) =>  combineReducers({
    router: connectRouter(history),
    registration,
    planner,
});

// export type AppState = ReturnType<typeof rootReducer>;

// export interface State {
//     count: number
//     router: RouterState
// }

export default rootReducer;