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
import IndustryInfoChart from '../../components/chart/IndustryInfoChart'
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

function TRInfo({ transformer, saveDailyRates, saveQuarterRates, saveMonthlyRates, saveEachTransInfo }) {
  const parsed = queryString.parse(window.location.search);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
 
  // const handlemonthChange = (value, mode) => {
  //   if (mode === 'month') {
  //     setSelectedYear(value.year());
  //     setSelectedMonth(value.month());
  //   }
  // };
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
    // getDailyRates(parsed.coor, parsed.div, parsed.tr_index,2022,7).then((data) => {
    //   // getDailyRates().then((data) => {
    //   if (data.errStatus) {
    //     console.log(data.errDetail);
    //   } else {
    //     saveDailyRates(data)
    //   }
    // })
    // getEachTransformer
    // getQuarterRates().then((data) => {
    //   if (data.errStatus) {
    //     console.log(data.errDetail);
    //   } else {
    //     saveQuarterRates(data)
    //   }
    // })
    // getMonthlyRates(parsed.coor,parsed.div,parsed.tr_index,2022).then((data) => {
    //   if (data.errStatus) {
    //     console.log(data.errDetail);
    //   } else {

    //     saveMonthlyRates(data)
    //   }
    // })

    // getEachTransformer(parsed.coor,parsed.div,parsed.tr_index).then((data) => {
    //   if (data.errStatus) {
    //     console.log(data.errDetail);
    //   } else {

    //     saveEachTransInfo(data)
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

  }, [])
  const _history = useHistory();
  return (
    <Layout class="px-20 wrapper">
      
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
      <IndustryInfoChart />   
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