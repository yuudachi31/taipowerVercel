//antd
import { Layout, Divider, Row, Col, Table } from 'antd';
import { MessageOutlined, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { red, green, lime, yellow, orange, volcano } from '@ant-design/colors';
import styles from '../../index.less'
import moment from 'moment';
import { saveDailyRates, saveQuarterRates, saveMonthlyRates, saveEachTransInfo } from '../../actions/transformer'
// import EChartRate from '../../components/chart/EChartRate';
import { data_main, data_month } from '../../components/chart/TempData'
import { getDailyRates, getQuarterRates, getMonthlyRates, getEachTransformer } from '../../api/frontApi'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import PredictList from './PredictList'
import predictTestData from './predictTestData.json'
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
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
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
          <div>資料表數 :<span class="ml-2">10 個（6 個 AMI）</span></div>
          <div>資料完整度 :<span class="ml-2">10 %</span></div>
        </Content>
        <Content class="text-base tracking-widest space-y-5 flex-col">
          <div>組別 :<span class="ml-2">{transformer.eachTransformerInfo.div}</span></div>
          <div>容量 :<span class="ml-2">{transformer.eachTransformerInfo.cap} KWA</span></div>
          <div>日期 :<span class="ml-2"></span></div>
        </Content>
        <Content class="flex justify-end w-50 gap-2" >
          <div class="flex w-100 h-100 gap-2" style={{ alignItems:'end' }}>
            <button class="btn btn-orange bg-orange-400 flex-end" type="primary" onClick={() => { _history.push(`/EChartMonthPage`) }}>選擇既有變壓器</button>
            <button class="btn btn-orange bg-orange-400 flex-end" type="primary" onClick={() => { _history.push(`/EChartMonthPage`) }}>新增虛擬變壓器</button>
          </div>
          {/* <EChartRate /> */}
        </Content>
      </Layout>

      {/* 負載變壓器規劃 */}
      <Divider />
      <Layout class="py-1 pb-20">
        <h2 class="flex-auto font-normal text-base font-bold">負載變壓器規劃</h2>
        <Row>
          <Col span={12}><div class="font-bold mb-3">T01</div></Col>
          <Col span={12}><div class="font-bold mb-3">虛擬/既設變壓器組別名稱</div></Col>
        </Row>
        
        {/* 每具資料 */}
        <Content>
          <Row>
            <Col span={12}><div class="text-orange-400 mb-2">第一具：燈力</div></Col>
            <Col span={12}><div class="text-orange-400 mb-2">第一具：燈</div></Col>
          </Row>
          <Content class="predict-box">
            <PredictList/>
            <Divider />
            <PredictList/>
          </Content>
        </Content>
        {/* </div> */}
        <Content class="flex justify-end w-50 gap-2 mt-5" >
          <div class="flex w-100 h-100 gap-2">
            <button class="btn btn-orange bg-orange-400 flex-end" type="primary" onClick={() => { _history.push(`/EChartMonthPage`) }}>儲存移動</button>
            <button class="btn btn-orange bg-orange-400 flex-end" type="primary" onClick={() => { _history.push(`/EChartMonthPage`) }}>結束規劃</button>
            <button class="btn btn-green bg-green-400 flex-end" type="primary" onClick={() => { _history.push(`/EChartMonthPage`) }}>匯出規劃</button>
          </div>
          {/* <EChartRate /> */}
        </Content>
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