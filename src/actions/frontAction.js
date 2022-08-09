import {
    SET_TEST,
} from '../utils/actionType/frontActionType'

export const setTest = () => {
    return {
        type: SET_TEST,
        payload: {
            test: 5
        }
    }
}