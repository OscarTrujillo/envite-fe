import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/base.reducer";
import socketMiddleware from "../middlewares/base.middleware";

const store = createStore(
    rootReducer,
    applyMiddleware(socketMiddleware)
);

export default store;