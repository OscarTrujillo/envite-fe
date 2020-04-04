import planner from './planner.reducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    planner,
});

// export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;