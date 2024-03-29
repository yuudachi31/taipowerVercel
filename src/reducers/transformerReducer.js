import { SAVE_TRANS_DATA, SAVE_DAILYRATES, SAVE_QUARTERRATES, SAVE_MONTHLYRATES, SAVE_EACHTRANSINFO, SAVE_ABN_TRANS_DATA } from "../utils/actionType/frontActionType";

const initialState = {
  transformerList: [],
  dailyRatesList: [],
  quarterRatesList: [],
  monthlyRatesList: [],
  ABNtransformerList: [],
  eachTransformerInfo: {

  }
};

export const transformerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TRANS_DATA:
      const data = [];
      action.payload?.forEach((element, index) => {
        if (element.power_type == 'Y接') {
          data.push({
            key: index,
            coor: [element.coor, element.div, element.tr_index],
            div: element.div,
            tr_index: 'NA',
            uti_rate: element.uti_rate.toFixed(1),
            cap: element.cap,
            type: element.type,
            // cust_num: element.cust_num,
            num: element.num,
            transformer_threshold: element.transformer_threshold,
            power_type: element.power_type,
            // addr: element.addr,
            // notify: 'nan'
          })
        } else {
          data.push({
            key: index,
            coor: [element.coor, element.div, element.tr_index],
            div: element.div,
            tr_index: element.tr_index,
            uti_rate: element.uti_rate.toFixed(1),
            cap: element.cap,
            type: element.type,
            // cust_num: element.cust_num,
            num: element.num,
            transformer_threshold: element.transformer_threshold,
            power_type: element.power_type,
            // addr: element.addr,
            // notify: 'nan'
          })
        }

      });
      return {
        ...state,
        transformerList: data,
      };
    case SAVE_ABN_TRANS_DATA:
      const abnData = [];
      action.payload.forEach((element, index) => {
        if (element.power_type == 'Y接') {
          abnData.push({
            key: index,
            coor: [element.coor, element.div, element.tr_index],
            div: element.div,
            tr_index: 'NA',
            uti_rate: element.uti_rate.toFixed(1),
            cap: element.cap,
            // type: element.type,
            // cust_num: element.cust_num,
            num: element.num,
            transformer_threshold: element.transformer_threshold,
            power_type: element.power_type,
            // addr: element.addr,
            // notify: 'nan',
            danger_lv: [String(element.danger_lv)]
          })
        } else {
          abnData.push({
            key: index,
            coor: [element.coor, element.div, element.tr_index],
            div: element.div,
            tr_index: element.tr_index,
            uti_rate: element.uti_rate.toFixed(1),
            cap: element.cap,
            // type: element.type,
            // cust_num: element.cust_num,
            num: element.num,
            transformer_threshold: element.transformer_threshold,
            power_type: element.power_type,
            // addr: element.addr,
            // notify: 'nan'
            danger_lv: [String(element.danger_lv)]
          })
        }

      });
      return {
        ...state,
        ABNtransformerList: abnData,
      };

    case SAVE_DAILYRATES:
      const dailyrates = [];
      action.payload.forEach((element, index) => {
        if (!element.isEmpty) {
          // console.log(`${element.peak_rate.toFixed(1)}+${element.off_peak_rate.toFixed(1)}=${(element.peak_rate + element.off_peak_rate).toFixed(1)}`)
          dailyrates.push({
            key: index,
            'load_on': element.peak_rate.toFixed(1),
            'load_on_forChart': element.peak_rate.toFixed(1) - element.off_peak_rate.toFixed(1),
            'load_off': element.off_peak_rate.toFixed(1),
            'load_total': element.peak_rate.toFixed(1),
            'uti_rate': element.peak_rate + element.off_peak_rate,
            'uti_rate_two': element.off_peak_rate.toFixed(1),
            'x_key': element.date_day
          })
        }

      });
      return {
        ...state,
        dailyRatesList: [...dailyrates],
      };
    case SAVE_QUARTERRATES:
      const quarterRates = [];
      // let time = ["0:00","2:00", '4:0', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'];
      action.payload.forEach((element, index) => {
        let time = ["0:00","2:00", '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'];
        let aaa ="12:00"
        if ( index!=0 && (index+1)%8 == 0) {
          
console.log(index)
          quarterRates.push({
            // key: index,
            load: Number(element.uti_rate_15min.toFixed(1)),
            x_key: `${(index+1)/4}:00`,
          })
        } else {
          quarterRates.push({
            // key: index,
            load: Number(element.uti_rate_15min.toFixed(1)),
            x_key: '',
          })
        }


      });
      console.log(quarterRates)
      return {
        ...state,
        quarterRatesList: quarterRates,
      };
    case SAVE_MONTHLYRATES:
      const monthlyRates = [];
      // const time = ['2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'];
      for (let i = 1; i <= 12; i++) {
        let haveData = false
        action.payload.forEach((element, index) => {
if(element.date_month==i){
  haveData = true

          let month = `${element.date_month}月`
          if (element.is_predict == 1) {
            monthlyRates.push({
              'load_on': Math.ceil(element.peak_rate),
              'load_on_forChart': Math.ceil(element.peak_rate) - Math.ceil(element.off_peak_rate),
              'load_off': Math.ceil(element.off_peak_rate),
              'load_total': Math.ceil(element.peak_rate + element.off_peak_rate),
              'uti_rate': Math.ceil(element.peak_rate),
              'x_key': month,
              'year': element.date_year,
              'predict_bars': 0
            })
          } else if (element.is_predict == 3) {
            monthlyRates.push({
  
            })
          }
  
          else {
            monthlyRates.push({
              'load_on': Math.ceil(element.peak_rate),
              'load_on_forChart': 0,
              'load_off': 0,
              'load_total': Math.ceil(element.peak_rate + element.off_peak_rate),
              'uti_rate': Math.ceil(element.peak_rate),
              'x_key': month,
              'year': element.date_year,
              'predict_bars': Math.ceil(element.peak_rate),
            })
          }
  
        }
        });

        if(haveData!=true){
          monthlyRates.push({
            'load_on': null,
            'load_on_forChart': 0,
            'load_off': 0,
            'load_total': 0,
            'uti_rate': 0,
            'x_key': `${i}月`,
            'year': 0,
            'predict_bars': 0,
          })
        }
      }

      // action.payload.forEach((element, index) => {

      //   let month = `${element.date_month}月`
      //   if (element.is_predict == 1) {
      //     monthlyRates.push({
      //       'load_on': Math.ceil(element.peak_rate),
      //       'load_on_forChart': Math.ceil(element.peak_rate) - Math.ceil(element.off_peak_rate),
      //       'load_off': Math.ceil(element.off_peak_rate),
      //       'load_total': Math.ceil(element.peak_rate + element.off_peak_rate),
      //       'uti_rate': Math.ceil(element.peak_rate),
      //       'x_key': month,
      //       'year': element.date_year,
      //       'predict_bars': 0
      //     })
      //   } else if (element.is_predict == 3) {
      //     monthlyRates.push({

      //     })
      //   }

      //   else {
      //     monthlyRates.push({
      //       'load_on': Math.ceil(element.peak_rate),
      //       'load_on_forChart': 0,
      //       'load_off': 0,
      //       'load_total': Math.ceil(element.peak_rate + element.off_peak_rate),
      //       'uti_rate': Math.ceil(element.peak_rate),
      //       'x_key': month,
      //       'year': element.date_year,
      //       'predict_bars': Math.ceil(element.peak_rate),
      //     })
      //   }


      // });
      console.log(monthlyRates)
      return {
        ...state,
        monthlyRatesList: monthlyRates,
      };
    case SAVE_EACHTRANSINFO:
      console.log(action.payload)
      return {
        ...state,
        eachTransformerInfo: action.payload[0],
      };

    default:
      return state;
  }
};
