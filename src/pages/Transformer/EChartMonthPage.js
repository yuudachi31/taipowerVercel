//antd
import { Layout, Divider, DatePicker, Progress, Spin } from 'antd';
import { red, green, lime, yellow, orange, volcano } from '@ant-design/colors';
import moment from 'moment';
import { saveDailyRates, saveQuarterRates, saveMonthlyRates, saveEachTransInfo } from '../../actions/transformer'
import EChartMain from '../../components/chart/EChartMain';
import EChartDay from '../../components/chart/EChartDay';
// import EChartRate from '../../components/chart/EChartRate';
import { data_main, data_month } from '../../components/chart/TempData'
import { getDailyRates, getQuarterRates, getMonthlyRates, getEachTransformer, getDailyRatesRange } from '../../api/frontApi'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import qs from "qs";

const { Header, Sider, Content } = Layout;

const Timeformat = 'HH:mm';

const yearFormat = 'YYYY 年';
const monthFormat = 'YYYY 年 MM 月';
const dayFormat = 'YYYY 年 MM 月 DD 日';
const currentDate = new Date('2022/6/1');
console.log('currentDate', currentDate)
const currentMonth = currentDate.getMonth;
const currentHour = currentDate.getHours;
const defaultTimeRange = [currentHour, currentHour];
const defaultMonth = [currentMonth, currentMonth];

const onChangeMonth = (date, dateString) => {
  console.log(date, dateString);
};

function EChartDayPage({ transformer, saveDailyRates, saveQuarterRates, saveMonthlyRates, saveEachTransInfo }) {
  const parsed = qs.parse(window.location.search);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(6);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isLoadingbottom, setIsLoadingbottom] = useState(true);
  const [interval, setInterval] = useState(
    {
      "min_year": 2022,
      "min_month": 5,
      "min_day": 1,
      "max_year": 2022,
      "max_month": 11,
      "max_day": 31
    }
  )
  let disabledDate = (cur) => {
    // console.log(cur&&cur<moment().startOf('day'))
    // console.log(cur&&cur<moment().startOf('day'))
    // moment(new Date('2022/5/5'),dayFormat)
    return (cur && cur < moment(new Date(`${interval.min_year}/${interval.min_month}/${interval.min_day}`)).startOf('day') || cur && cur > moment(new Date(`${interval.max_year}/${interval.max_month}/${interval.max_day}`)).startOf('day'))
  }
  const handlemonthChange = (value, mode) => {
    if (mode === 'month') {
      setSelectedYear(value.year());
      setSelectedMonth(value.month());
    }
  };
  const handledayChange = (value, mode) => {

    setSelectedDay(mode);

  };
  // console.log(transformer.dailyRatesList)

  const handlePanelChange = (value, mode) => {
    if (mode === 'year') {
      setSelectedYear(value.year());
      getMonthlyRates(parsed.coor, parsed.div, parsed.tr_index, value.year()).then((data) => {
        if (data.errStatus) {
          console.log(data.errDetail);
        } else {

          saveMonthlyRates(data)
        }
      })
    }
  };
  const handlePanelChange_daily = (value, mode) => {
    const parsed = qs.parse(window.location.search);
    // setSelectedYear(value.year());
    if (mode === 'month') {
      setSelectedYear(value.year());
      setSelectedMonth(value.month() + 1);
      // console.log(value.month())
      // const parsed = qs.parse(window.location.search);
      console.log(value.year())
      saveDailyRates([{
        isEmpty:true
      }])
      getDailyRates(parsed.coor, parsed.div, parsed.tr_index, value.year(), value.month() + 1).then((data) => {
        if (data.errStatus) {
          console.log(data.errDetail);
        } else {
          saveDailyRates(data)
        }
      })
    }
  }
  console.log(transformer.dailyRatesList)
  useEffect(() => {
    const parsed = qs.parse(window.location.search);
    saveDailyRates([{
        isEmpty:true
      }])
    setSelectedMonth(parsed.month)
    setSelectedYear(parsed.year)
    getDailyRates(parsed.coor, parsed.div, parsed.tr_index, 2022, parsed.month).then((data) => {

      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        saveDailyRates(data)
        setIsLoadingbottom(false)
      }
    })
    getEachTransformer(parsed.coor, parsed.div, parsed.tr_index).then((data) => {
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {

        saveEachTransInfo(data)
      }
    })
    getDailyRatesRange(parsed.coor, parsed.div, parsed.tr_index).then((data) => {

      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        setInterval({
          ...data[0],
          "min_day": 1,
          "max_day": 2
        })
      }
    })
    // getMonthlyRates(parsed.coor,parsed.div,parsed.tr_index,2022).then((data) => {
    //   if (data.errStatus) {
    //     console.log(data.errDetail);
    //   } else {

    //     saveMonthlyRates(data)
    //   }
    // })

  }, [])
  const _history = useHistory();
  return (
    <Layout class="px-20 wrapper">
      <Divider />
      <Header class="flex space-x-3 items-center">
        <h2 class="flex-auto font-normal text-base">圖號座標<span class="text-2xl font-bold ml-6">{transformer.eachTransformerInfo.coor}</span></h2>
        <button class="btn btn-orange bg-orange-400 flex" type="primary" onClick={() => { _history.push(`/PredictPage?coor=${parsed.coor}&div=${parsed.div}&tr_index=${parsed.tr_index}`) }}>負載分割</button>
        <button class="btn flex" type="primary" onClick={() => { _history.push(`/tr/info/?coor=${parsed.coor}&div=${parsed.div}&tr_index=${parsed.tr_index}`) }}>返回年圖表</button>
      </Header>
      
      <Layout class="flex justify-between py-2">
        <Content class="text-base tracking-widest space-y-5 flex-col">
          <div>所轄區處 :<span class="ml-2">{transformer.eachTransformerInfo.addr}</span></div>
          <div>住戶表數 :<span class="ml-2">10 個</span></div>
          <div>AMI資料完整度 :<span class="ml-2">10 %</span></div>
        </Content>
        <Content class="text-base tracking-widest space-y-5 flex-col">
          <div>組別 :<span class="ml-2">{transformer.eachTransformerInfo.div}</span></div>
          <div>容量 :<span class="ml-2">{transformer.eachTransformerInfo.cap} KVA</span></div>
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


      {/* <Layout>
        <Header class="flex items-center justify-between mb-14">
          <div class="space-x-2 flex-1">
            <span class="text-base " style={{ fontSize: '14px' }}>期間選擇</span>
            <DatePicker defaultValue={moment(currentDate, yearFormat)} format={yearFormat} picker="year" onPanelChange={handlePanelChange}/>
          </div>
          {selectedYear ? (<h3 class="font-bold flex-1 text-center m-0 text-base">{selectedYear} 年度 每月用電圖表</h3>):(<h3 class="font-bold flex-1 text-center m-0 text-base">2022 年度 每月用電圖表</h3>)}
          <div class="flex flex-col flex-1">
            <div class="flex flex-1 items-center justify-end">
            <span class="mt-2 border-2 border-gray-300 w-7 h-0 bg-green"></span>
              <span class="mt-2 ml-2 mr-6">保證利用率</span>
              <span class="mt-2 w-7 h-3 bg-green-500"></span>
              <span class="mt-2 ml-2">尖峰利用率</span>
              
            </div>
            <div class="flex items-center justify-end">
            <span class="mt-2 bg-gray-300 w-7 h-3"></span>
              <span class="mt-2 ml-2 mr-6">預估利用率</span>
              <span class="mt-2 w-7 h-3 bg-green-300"></span>
              <span class="mt-2 ml-2">離峰利用率</span>
            </div>
          </div>
        </Header>
      </Layout> */}


      <Layout class="py-2">
        <Header class="flex items-center justify-between">

          <div class="space-x-2 flex-1">
            <span class="text-base " style={{ fontSize: '14px' }}>期間選擇</span>
            {/* <DatePicker defaultValue={moment(currentDate, monthFormat)} format={monthFormat} picker="month" onPanelChange={handlemonthChange}/> */}
            <DatePicker defaultValue={moment(currentDate, monthFormat)} disabledDate={disabledDate} format={monthFormat} picker="month" onPanelChange={handlePanelChange_daily} />
          </div>
          {selectedMonth ? (<h3 class="font-bold flex-1 text-center m-0 text-base">{selectedYear} 年度 {selectedMonth} 月每日用電圖表</h3>) : (<h3 class="font-bold flex-1 text-center m-0 text-base">2022 年度 6 月每日用電圖表</h3>)}
          <div class="flex flex-1 items-center justify-end">

            <span class="w-7 h-3 bg-green-500"></span>
            <span class="ml-2 mr-6">尖峰利用率</span>
            <span class="w-7 h-3 bg-green-300"></span>
            <span class="ml-2">離峰利用率</span>
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
            
            <Content class="flex justify-center items-center mt-14 mb-20 w-full">
              <span class="min-w-max h-8 -mr-6 transform -rotate-90 text-center">利用率 (%)</span>
              <EChartMain data={transformer.dailyRatesList} />
              {/* <span class="min-w-max h-8 -ml-6 transform rotate-90 text-center">利用率 (%)</span> */}
            </Content>
          )}
      </Layout>

      {/* <Layout>

        <Header class="flex items-center justify-between">
          <div class="space-x-3 flex-1">
            <span class="text-base " style={{ fontSize: '14px' }}>期間選擇</span>
            <DatePicker defaultValue={moment(currentDate, dayFormat)} format={dayFormat} onChange={handledayChange} />

          </div>
          { selectedDay ? (<h3 class="font-bold flex-1 text-center m-0 text-base"> {selectedDay} 當日用電圖表</h3>):(<h3 class="font-bold flex-1 text-center m-0 text-base">2022 年 06 月 01 日 當日用電圖表</h3>)}

          <div class="flex flex-1 items-center justify-end">
            
            <span class="border-2 border-green-500 w-7 h-0 bg-green"></span>
            <span class="ml-2 mr-6">尖峰利用率</span>
          </div>

        </Header>
        <Content class="flex justify-center items-center mt-10 mb-20 w-full">
          <span class="min-w-max h-8 -mr-9 transform -rotate-90 text-center">利用率 (%)</span>
          <EChartDay data={transformer.quarterRatesList} />
        </Content>
      </Layout> */}

    </Layout>
  );

}
const mapStateToProps = ({ transformerReducer }) => ({
  transformer: transformerReducer,
});

const mapDispatchToProps = {
  saveDailyRates, saveQuarterRates, saveMonthlyRates, saveEachTransInfo
};
export default connect(mapStateToProps, mapDispatchToProps)(EChartDayPage);