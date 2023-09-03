import { RESET_TEST, LOGIN } from "../utils/actionType/frontActionType";

const initialState = {
  logintest: 0,
  token:0
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_TEST:
      return {
        ...state,
        logintest: action.payload.test,
      };
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
      };

    default:
      return state;
  }
};
