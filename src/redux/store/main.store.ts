import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/base.reducer";
import socketMiddleware from "../middlewares/socket.middleware";

const store = createStore(
    rootReducer,
    applyMiddleware(socketMiddleware())
);

export default store;