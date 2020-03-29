import { createStore } from "redux";
import rootReducer from "../reducers/base.reducers";

const store = createStore(rootReducer);

export default store;