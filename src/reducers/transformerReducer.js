import { SAVE_TRANS_DATA,SAVE_DAILYRATES} from "../utils/actionType/frontActionType";

const initialState = {
transformerList:[],
dailyRatesList:[]
};

export const transformerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TRANS_DATA:
        const data=[];
        action.payload.forEach((element,index) => {
            data.push({
                key: index,
                see: element.coor,
                group: element.div,
                number: 'nan',
                rate: 'nan',
                vol: 'nan',
                notify: 'nan'
            })
        });
      return {
        ...state,
        transformerList:data,
      };
      case SAVE_DAILYRATES:
        const dailyrates=[];
        action.payload.forEach((element,index) => {
          dailyrates.push({
            key:index,
              'load_on': Math.ceil(Math.random() * 50),
              'load_off': Math.ceil(Math.random() * 20),
              'load_total': Math.ceil(element.peak_rate),
              'uti_rate' :Math.ceil(element.peak_rate),
              'uti_rate_two': Math.ceil(element.off_peak_rate),
              'x_key': element.date_day
            })
        });
      return {
        ...state,
        dailyRatesList:dailyrates,
      };
    default:
      return state;
  }
};
