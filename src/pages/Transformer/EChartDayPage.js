//antd
import { Layout, Divider, DatePicker, Progress, Spin } from 'antd';

import { MessageOutlined, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { red, green, lime, yellow, orange, volcano } from '@ant-design/colors';
import styles from '../../index.less'
import moment from 'moment';
import { saveDailyRates, saveQuarterRates, saveMonthlyRates, saveEachTransInfo } from '../../actions/transformer'
import EChartMain from '../../components/chart/EChartMain';
import EChartDay from '../../components/chart/EChartDay';
import EChartMonth from '../../components/chart/EChartMonth';
// import EChartRate from '../../components/chart/EChartRate';
import { data_main, data_month } from '../../components/chart/TempData'
import { getDailyRates, getQuarterRates, getMonthlyRates, getEachTransformer,getQuarterRatesRange} from '../../api/frontApi'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { parse } from 'papaparse';
// const parsed = queryString.parse(window.location.search);
const { Header, Sider, Content } = Layout;

const Timeformat = 'HH:mm';

const yearFormat = 'YYYY 年';
const monthFormat = 'YYYY 年 MM 月';
const dayFormat = 'YYYY 年 MM 月 DD 日';
// const currentDate = new Date('2022/6/1');
// let currentDate = new Date(`${parsed.year}/${parsed.month}/${parsed.day}`);

// console.log(moment(new Date('2022/5/5'),dayFormat))
// const currentMonth = currentDate.getMonth;
// const currentHour = currentDate.getHours;
// const defaultTimeRange = [currentHour, currentHour];
// const defaultMonth = [currentMonth, currentMonth];

const onChangeMonth = (date, dateString) => {
  console.log(date, dateString);
};

function TRInfo({ transformer, saveDailyRates, saveQuarterRates, saveMonthlyRates, saveEachTransInfo }) {
  const parsed = queryString.parse(window.location.search);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isLoadingbottom, setIsLoadingbottom] = useState(true);
  const [currentDate,setCurrentDate]=useState(null);
 const [interval,setInterval]=useState(
  {
    "min_year": 2022,
    "min_month": 5,
    "min_day": 1,
    "max_year": 2022,
    "max_month": 11,
    "max_day": 31
  }
)
let disabledDate= (cur)=>{
  // console.log(cur&&cur<moment().startOf('day'))
  // console.log(cur&&cur<moment().startOf('day'))
  // moment(new Date('2022/5/5'),dayFormat)
  return(cur&&cur<moment(new Date(`${interval.min_year}/${interval.min_month}/${interval.min_day}`)).startOf('day')||cur&&cur>moment(new Date(`${interval.max_year}/${interval.max_month}/${interval.max_day}`)).startOf('day'))
  }
console.log()
  // const handlemonthChange = (value, mode) => {
  //   if (mode === 'month') {
  //     setSelectedYear(value.year());
  //     setSelectedMonth(value.month());
  //   }
  // };
  const handledayChange = (value,mode) => {
    
    setSelectedDay(mode);
    let selectedDate = mode.split(" ")
    setSelectedYear(selectedDate[0])
    setSelectedMonth(selectedDate[2])
    setSelectedDay(selectedDate[4])
    saveQuarterRates([{uti_rate_15min:0},{uti_rate_15min:0},{uti_rate_15min:0}])
    getQuarterRates(parsed.coor, parsed.div, parsed.tr_index,selectedDate[0],selectedDate[2],selectedDate[4]).then((data) => {
    
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        saveQuarterRates(data)

      }
    })
  };
  // console.log(transformer.dailyRatesList)

  // const handlePanelChange = (value, mode) => {
  //   if (mode === 'year') {
  //     setSelectedYear(value.year());
  //     getMonthlyRates(parsed.coor, parsed.div, parsed.tr_index, value.year()).then((data) => {
  //       if (data.errStatus) {
  //         console.log(data.errDetail);
  //       } else {

  //         saveMonthlyRates(data)
  //       }
  //     })
  //   }
  // };
  // const handlePanelChange_daily =(value,mode)=>{
  //   const parsed = queryString.parse(window.location.search);
  //   // setSelectedYear(value.year());
  //   if (mode === 'month') {
  //     setSelectedYear(value.year());
  //     setSelectedMonth(value.month());
  //   // const parsed = queryString.parse(window.location.search);
  //     console.log(value.year())
  //     getDailyRates(parsed.coor, parsed.div, parsed.tr_index, value.year(),value.month()+1).then((data) => {
  //       if (data.errStatus) {
  //         console.log(data.errDetail);
  //       } else {

  //         saveDailyRates(data)
  //       }
  //     })
  //   }
  // }
  // console.log(transformer.dailyRatesList)
  useEffect(() => {
    saveQuarterRates([{uti_rate_15min:0},{uti_rate_15min:0},{uti_rate_15min:0}])
    // console.log(moment(new Date(`${interval.min_year}/${interval.min_month}/${interval.min_day}`)))
    const parsed = queryString.parse(window.location.search);
    // let interval = {}
     setSelectedMonth(parsed.month)
     setSelectedYear(parsed.year)
     setSelectedDay(parsed.day)
     getQuarterRates(parsed.coor, parsed.div, parsed.tr_index,parsed.year,parsed.month,parsed.day).then((data) => {
     
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        saveQuarterRates(data)
        setIsLoadingbottom(false)
      }
    })
    getQuarterRatesRange(parsed.coor, parsed.div, parsed.tr_index).then((data) => {
     
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        setInterval(data[0])
      }
    })
    // let currentDate = new Date(`${parsed.year}/${parsed.month}/${parsed.day}`);
    getEachTransformer(parsed.coor,parsed.div,parsed.tr_index).then((data) => {
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {

        saveEachTransInfo(data)
      }})
    //     getMonthlyRates(parsed.coor,parsed.div,parsed.tr_index,2022).then((data) => {
    //       if (data.errStatus) {
    //         console.log(data.errDetail);
    //       } else {
    
    //         saveMonthlyRates(data)
    //       }
    //     })
    //   }
    // })

    // result
    // setSelectedYear(parsed.year)
    // setSelectedMonth(parsed.month)
    // setSelectedDay(parsed.day)
    // currentDate = new Date(`${selectedYear}/${selectedMonth}/${selectedDay}`);
    setCurrentDate(new Date(`${parsed.year}/${parsed.month}/${parsed.day}`))
  }, [])
  const _history = useHistory();
  return (
    <Layout class="px-20 wrapper">
      <Header class="pt-4 flex space-x-3 items-center">
        <h2 class="flex-auto font-normal text-base">圖號座標<span class="font-bold text-2xl ml-7">{transformer.eachTransformerInfo.coor}</span></h2>
        {/* <button class="btn flex-none"><MessageOutlined />推播</button> */}
        <button class="btn btn-orange bg-orange-400 flex" type="primary" onClick={() => { _history.push(`/PredictPage`) }}>負載分割</button>
        <button class="btn flex" type="primary" onClick={() => { _history.push(`/EChartMonthPage?coor=${parsed.coor}&div=${parsed.div}&tr_index=${parsed.tr_index}&year=${parsed.year}&month=${parsed.month}`) }}>返回月圖表</button>
        <button class="btn flex" type="primary" onClick={() => { _history.push(`/tr/info/?coor=${parsed.coor}&div=${parsed.div}&tr_index=${parsed.tr_index}`) }}>返回年圖表</button>
      </Header>
      <Divider />
      <Layout class="flex justify-between py-2">
        <Content class="text-base tracking-widest space-y-5 flex-col">
          <div>地址 :<span class="ml-2">{transformer.eachTransformerInfo.addr}</span></div>
          <div>資料表數 :<span class="ml-2">10 個</span></div>
          <div>資料完整度 :<span class="ml-2">10 %</span></div>
        </Content>
        <Content class="text-base tracking-widest space-y-5 flex-col">
          <div>組別 :<span class="ml-2">{transformer.eachTransformerInfo.div}</span></div>
          <div>容量 :<span class="ml-2">{transformer.eachTransformerInfo.cap} KW</span></div>
        </Content>
        <Content class="text-base tracking-widest space-y-5 flex-col">
          <div>第幾具 :<span class="ml-2">1/2</span></div>
          
        </Content>

        <Content class="relative flex-col w-40 gap-2" >
          <span class="relative text-base tracking-widest">利用率(%)</span>
          <div class="flex mt-8 w-100 h-100 gap-2">
            
            <Progress percent={Math.floor(transformer.eachTransformerInfo.uti_rate)} steps={5} size={80} status='active' strokeColor={[green[4], lime[4], yellow[4], orange[4], volcano[5]]} />
          </div>
          {/* <EChartRate /> */}
        </Content>

      </Layout>
      <Divider />
      <Layout>

        <Header class="flex items-center justify-between">
          <div class="space-x-3 flex-1">
            <span class="text-base " style={{ fontSize: '14px' }}>期間選擇</span>
            {/* <DatePicker defaultValue={moment(new Date(`${interval.min_year}/${interval.min_month}/${interval.min_day}`), dayFormat)}   format={dayFormat} onChange={handledayChange} /> */}
            <DatePicker defaultValue={moment(new Date(`${parsed.year}/${parsed.month}/${parsed.day}`), dayFormat)} disabledDate={disabledDate}  format={dayFormat} onChange={handledayChange} />
          </div>
          { selectedDay ? (<h3 class="font-bold flex-1 text-center m-0 text-base"> {selectedYear} 年 {selectedMonth}  月 {selectedDay} 日 當日用電圖表</h3>):(<h3 class="font-bold flex-1 text-center m-0 text-base">{selectedYear} 年 {selectedMonth}  月 {selectedDay} 日 當日用電圖表</h3>)}

          <div class="flex flex-1 items-center justify-end">
            {/* <span class="border-2 border-black w-7 h-0 bg-green"></span>
            <span class="ml-2 mr-6">尖峰利用率</span> */}
            <span class="border-2 border-green-500 w-7 h-0 bg-green"></span>
            <span class="ml-2 mr-6">尖峰利用率</span>
          </div>

        </Header>

        {
          isLoadingbottom ? (
          <> 
            <div style={{height:'200px'}}>
              <Spin tip="圖表載入中" size="large" style={{height:'200px'}}>
                <div className="content" />
              </Spin> 
            </div>
          </>) : (  
            
        <Content class="flex justify-center items-center mt-10 mb-20 w-full">
          <span class="min-w-max h-8 -mr-9 transform -rotate-90 text-center">利用率 (%)</span>
          <EChartDay data={transformer.quarterRatesList} />
        </Content>
        )}
      </Layout>
    </Layout>
  );

}
const mapStateToProps = ({ transformerReducer }) => ({
  transformer: transformerReducer,
});

const mapDispatchToProps = {
  saveDailyRates, saveQuarterRates, saveMonthlyRates, saveEachTransInfo
};
export default connect(mapStateToProps, mapDispatchToProps)(TRInfo);