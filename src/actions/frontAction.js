import {
    SET_TEST,
    RESET_TEST,
    LOGIN,
    STORE_USER_INFO
} from '../utils/actionType/frontActionType'

export const setTest = () => {
    return {
        type: SET_TEST,
        payload: {
            test: 5
        }
    }
}
export const resetTest = (num) => {
    return {
        type: RESET_TEST,
        payload: {
            test: num
        }
    }
}
export const loginAction=(token)=>{
    return {
        type: LOGIN,
        payload: {
            token: token
        }
    }
}
export const storeUserInfo=(info)=>{
    return {
        type: STORE_USER_INFO,
        payload: {
            info: info
        }
    }
}