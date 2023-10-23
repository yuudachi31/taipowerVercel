import {
    SAVE_TRANS_DATA,
    SAVE_DAILYRATES
} from '../utils/actionType/frontActionType'

export const saveTransData = (data) => {
    // console.log(data)
    return {
        type: SAVE_TRANS_DATA,
        payload:data
    }
}
export const saveDailyRates = (data) => {
    // console.log(data)
    return {
        type: SAVE_DAILYRATES,
        payload:data
    }
}