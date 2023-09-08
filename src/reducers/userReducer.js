import { RESET_TEST, LOGIN ,STORE_USER_INFO} from "../utils/actionType/frontActionType";

const initialState = {
  logintest: 0,
  token: 0,
  user_info: {
    user_id: null,
    email: null,
    chat_id: null,
    user_name: null,
    region_id: null,
    region_name: null,
    roles: [
      {
        role_name: null,
        grant_date: null,
      },
    ],
  },
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
      case STORE_USER_INFO:
        return {
          ...state,
          user_info:{
            ...state.user_info,
            user_id:action.payload.info.user_id,
            email: action.payload.info.email,
            chat_id: action.payload.info.chat_id,
            user_name: action.payload.info.user_name,
            region_id: action.payload.info.region_id,
            region_name: action.payload.info.region_name,
            roles:[
              ...action.payload.info.roles
            ]
          }
        };
    default:
      return state;
  }
};
