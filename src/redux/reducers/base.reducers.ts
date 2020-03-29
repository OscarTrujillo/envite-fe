import planner from './planner.reducers';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    planner,
});

// export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;