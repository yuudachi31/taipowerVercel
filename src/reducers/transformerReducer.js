import { SAVE_TRANS_DATA,SAVE_DAILYRATES,SAVE_QUARTERRATES,SAVE_MONTHLYRATES} from "../utils/actionType/frontActionType";

const initialState = {
transformerList:[],
dailyRatesList:[],
quarterRatesList:[],
monthlyRatesList:[]
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
              'load_on': Math.ceil(element.peak_rate),
              'load_on_forChart': Math.ceil(element.peak_rate) -  Math.ceil(element.off_peak_rate),
              'load_off': Math.ceil(element.off_peak_rate),
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
      case SAVE_QUARTERRATES:
        const quarterRates=[];
        const time = ['2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'];
        action.payload.forEach((element,index) => {
          if(index!=0&&index%8 == 0){
            quarterRates.push({
              key:index,
                'load': Math.ceil(element.uti_rate_15min),               
                'x_key': time,
              })
             
          }
         
        });
        console.log(quarterRates)
      return {
        ...state,
        quarterRatesList:quarterRates,
      };
      case SAVE_MONTHLYRATES:
        const monthlyRates=[];
        // const time = ['2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'];
        action.payload.forEach((element,index) => {
          
    let month = `${element.date_month}月`

    monthlyRates.push({
        'load_on': Math.ceil(element.peak_rate),
        'load_on_forChart': Math.ceil(element.peak_rate) -  Math.ceil(element.off_peak_rate),
        'load_off': Math.ceil(element.off_peak_rate),
        'load_total': Math.ceil(element.peak_rate+element.off_peak_rate),
        'uti_rate': Math.ceil(element.peak_rate),
        'x_key': month,
    })
         
        });
        // console.log(monthlyRates)
      return {
        ...state,
        monthlyRatesList:monthlyRates,
      };
    default:
      return state;
  }
};
