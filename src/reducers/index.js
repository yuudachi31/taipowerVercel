import { combineReducers } from "redux";

import { frontReducer } from "./frontReducer";
import {userReducer} from "./userReducer"
import {transformerReducer} from "./transformerReducer"
const reducerApp = combineReducers({
  frontReducer,
  userReducer,
  transformerReducer
});

export default reducerApp;
