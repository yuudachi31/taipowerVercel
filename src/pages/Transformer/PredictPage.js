//antd
import { Layout, Divider, DatePicker, Progress, TimePicker } from 'antd';
import { MessageOutlined, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { red, green, lime, yellow, orange, volcano } from '@ant-design/colors';
import styles from '../../index.less'
import moment from 'moment';
import { saveDailyRates, saveQuarterRates, saveMonthlyRates, saveEachTransInfo } from '../../actions/transformer'
import testdata from '../../pages/Transformer/testdata.json';
// import EChartRate from '../../components/chart/EChartRate';
import { data_main, data_month } from '../../components/chart/TempData'
import { getDailyRates, getQuarterRates, getMonthlyRates, getEachTransformer } from '../../api/frontApi'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import PredictList from './PredictList'
const { Header, Sider, Content } = Layout;


const currentDate = new Date('2022/6/1');
console.log('currentDate', currentDate)
const currentMonth = currentDate.getMonth;
const currentHour = currentDate.getHours;
const defaultTimeRange = [currentHour, currentHour];
const defaultMonth = [currentMonth, currentMonth];

const onChangeMonth = (date, dateString) => {
  console.log(date, dateString);
};

function Predict({ transformer, saveDailyRates, saveQuarterRates, saveMonthlyRates, saveEachTransInfo }) {
  const parsed = queryString.parse(window.location.search);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
 
 
  const handledayChange = (value,mode) => {
    
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
  const handlePanelChange_daily =(value,mode)=>{
    const parsed = queryString.parse(window.location.search);
    // setSelectedYear(value.year());
    if (mode === 'month') {
      setSelectedYear(value.year());
      setSelectedMonth(value.month());
    // const parsed = queryString.parse(window.location.search);
      console.log(value.year())
      getDailyRates(parsed.coor, parsed.div, parsed.tr_index, value.year(),value.month()+1).then((data) => {
        if (data.errStatus) {
          console.log(data.errDetail);
        } else {

          saveDailyRates(data)
        }
      })
    }
  }
  // console.log(transformer.dailyRatesList)
  useEffect(() => {
    const parsed = queryString.parse(window.location.search);

  }, [])
  const _history = useHistory();
  return (
    <Layout class="px-20 wrapper">
      <Header class="pt-4 flex space-x-7 items-center">
        <h2 class="flex-auto font-normal text-base">圖號座標<span class="font-bold text-2xl ml-7">{transformer.eachTransformerInfo.coor}</span></h2>
        {/* <button class="btn flex-none"><MessageOutlined />推播</button> */}
        <button class="btn flex" type="primary" onClick={() => { _history.push(`/EChartMonthPage`) }}>返回月圖表</button>
      </Header>
      <Divider />
      <Layout class="flex justify-between py-2">
        <Content class="text-base tracking-widest space-y-5 flex-col">
          <div>所轄區處 :<span class="ml-2">{transformer.eachTransformerInfo.addr}</span></div>
          <div>資料表數 :<span class="ml-2">10 個</span></div>
          <div>資料完整度 :<span class="ml-2">10 %</span></div>
        </Content>
        <Content class="text-base tracking-widest space-y-5 flex-col">
          <div>組別 :<span class="ml-2">{transformer.eachTransformerInfo.div}</span></div>
          <div>容量 :<span class="ml-2">{transformer.eachTransformerInfo.cap}</span></div>
          <div>日期 :<span class="ml-2"></span></div>
        </Content>
        <Content class="text-base tracking-widest space-y-5 flex-col">
          <div>第幾具 :<span class="ml-2">1/2</span></div>
          
        </Content>

        <Content class="relative flex-row w-50 gap-2" >
          
          <div class="flex align-end w-100 h-100 gap-2">
          <button class="btn btn-orange bg-orange-400 flex-end" type="primary" onClick={() => { _history.push(`/EChartMonthPage`) }}>選擇既有變壓器</button>
          <button class="btn btn-orange bg-orange-400 flex-end" type="primary" onClick={() => { _history.push(`/EChartMonthPage`) }}>新增虛擬變壓器</button>
          </div>
          {/* <EChartRate /> */}
        </Content>

      </Layout>
      <Divider />
      <Layout class="py-1">
      <h2 class="flex-auto font-normal text-base">負載變壓器規劃</h2>
      <div class="text-orange-400 mb-2">第一具：燈</div>
      <div>
      <div class="text-black font-bold">第一具：燈</div>
      <PredictList/>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Predict);