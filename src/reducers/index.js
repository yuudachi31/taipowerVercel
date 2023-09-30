import { combineReducers } from "redux";

import { frontReducer } from "./frontReducer";
import {userReducer} from "./userReducer"
const reducerApp = combineReducers({
  frontReducer,
  userReducer
});

export default reducerApp;
