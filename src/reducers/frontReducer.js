import {
    SET_TEST,
} from '../utils/actionType/frontActionType'

const initialState = {
    test: 0,
};




export const frontReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEST:
            return {
                ...state,
                test: action.payload.test
            }
        default:
            return state
    }
}

