import {
    SAVE_USER_LIST
} from '../utils/actionType/frontActionType'

export const saveUserList = (data) => {
    console.log(data)
    return {
        type: SAVE_USER_LIST,
        payload:data
    }
}

