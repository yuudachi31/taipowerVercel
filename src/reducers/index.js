import { combineReducers } from "redux";

import { frontReducer } from "./frontReducer";
import {userReducer} from "./userReducer"
import {transformerReducer} from "./transformerReducer"
import{userManageReducer}from "./userManageReducer"
const reducerApp = combineReducers({
  frontReducer,
  userReducer,
  transformerReducer,
  userManageReducer
});

export default reducerApp;
