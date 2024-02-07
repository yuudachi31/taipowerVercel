import {
    SAVE_USER_LIST_API,SAVE_USER_LIST_EDIT
} from '../utils/actionType/frontActionType'

export const saveUserListApi = (data) => {
    console.log(data)
    return {
        type: SAVE_USER_LIST_API,
        payload:data
    }
}
export const saveUserListEdit = (data) => {
    console.log(data)
    return {
        type: SAVE_USER_LIST_EDIT,
        payload:data
    }
}

