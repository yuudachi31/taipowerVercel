import { SAVE_USER_LIST } from "../utils/actionType/frontActionType";

const initialState = {
  userList: [{
    user_id: 0,
    name: '',
    group: [''],
    email: '',
    // password: '11111111',
    district: [''],
    lock:['解鎖'],
  }],
};

export const userManageReducer = (state = initialState, action) => {
  // console.log("aaa")
  switch (action.type) {

    case SAVE_USER_LIST:
      const list = [];
      action.payload.forEach((element, index) => {
        if(!element.isEmpty){
          list.push({
            user_id: element.user_id,
            name: element.user_name,
            group: [element.roles[0].role_name],
            email: element.email,
            // password: '11111111',
            district: [element.region_name],
            lock:element.login_locked?['鎖定']:['解鎖'],
          })
        }
       
      });
      console.log(list)
      return {
        ...state,
        userList: [...list],
      };
    
    
    default:
      return state;
  }
};
