import { SAVE_USER_LIST_API,SAVE_USER_LIST_EDIT } from "../utils/actionType/frontActionType";

const initialState = {
  userList: [{
    user_id: 0,
    name: '',
    group: [''],
    email: '',
    // password: '11111111',
    district: [''],
    lock: ['解鎖'],
  }],
};

export const userManageReducer = (state = initialState, action) => {
  // console.log("aaa")
  switch (action.type) {

    case SAVE_USER_LIST_API:
      const list = [];
      action.payload.forEach((element, index) => {
        if (!element.isEmpty) {
          list.push({
            user_id: element.user_id,
            name: element.user_name,
            group: element.roles.map((el) => {
              switch (el.role_name) {
                case "adm":
                  return "區處管理員"
                case "ops":
                  return "運維"
                case "ove":
                  return "檢修"
              }
            }),
            email: element.email,
            // password: '11111111',
            chat_id:element.chat_id,
            region_id:element.region_id,
            district: [element.region_name],
            lock: element.login_locked ? ['鎖定'] : ['解鎖'],
          })
        }

      });
      console.log(list)
      return {
        ...state,
        userList: [...list],
      };
      case SAVE_USER_LIST_EDIT:
        const newListEdit=[...state.userList]
        // console.log(state.userList)
        // console.log(action.payload)
        // action.payload
        // console.log( state.userList.findIndex((el)=>(el.user_id==action.payload.user_id)))
        const idx=state.userList.findIndex((el)=>(el.user_id==action.payload.user_id))
        newListEdit.splice(idx,1,action.payload)
        return {
          ...state,
           userList: [...newListEdit],
        };

    default:
      return state;
  }
};
