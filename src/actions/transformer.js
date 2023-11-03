import {
    SAVE_TRANS_DATA,
    SAVE_DAILYRATES,
    SAVE_QUARTERRATES,
    SAVE_MONTHLYRATES,
    SAVE_EACHTRANSINFO
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
export const saveQuarterRates = (data) => {
    // console.log(data)
    return {
        type: SAVE_QUARTERRATES,
        payload:data
    }
}
export const saveMonthlyRates = (data) => {
    // console.log(data)
    return {
        type: SAVE_MONTHLYRATES,
        payload:data
    }
}
export const saveEachTransInfo = (data) => {
    // console.log(data)
    return {
        type: SAVE_EACHTRANSINFO,
        payload:data
    }
}

