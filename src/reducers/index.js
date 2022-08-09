import { combineReducers } from "redux";

import { frontReducer } from "./frontReducer";

const reducerApp = combineReducers({
  frontReducer,
});

export default reducerApp;
