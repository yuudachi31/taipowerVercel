//antd
import { Layout, Divider, DatePicker, Progress, TimePicker } from 'antd';

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
import { getDailyRates, getQuarterRates, getMonthlyRates, getEachTransformer } from '../../api/frontApi'
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import queryString from "query-string";

const { Header, Sider, Content } = Layout;

const date = new Date();
const year = date.getFullYear() - 1911
const month = date.getMonth() + 1
const Timeformat = 'HH:mm';

const monthFormat = 'YYYY 年 MM 月';
const onChangeMonth = (date, dateString) => {
  console.log(date, dateString);
};

function TRInfo({ transformer, saveDailyRates, saveQuarterRates, saveMonthlyRates, saveEachTransInfo }) {
  // console.log(transformer.dailyRatesList)
  useEffect(() => {
    getDailyRates().then((data) => {
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        // console.log(data)
        // console.log(data)
        saveDailyRates(data)


      }
    })
    // getEachTransformer
    getQuarterRates().then((data) => {
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        saveQuarterRates(data)
      }
    })
    getMonthlyRates().then((data) => {
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {

        saveMonthlyRates(data)
      }
    })
    const parsed = queryString.parse(window.location.search);
    getEachTransformer(parsed.custid).then((data) => {
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {

        saveEachTransInfo(data)
      }
    })

    // result

  }, [])
  const _history = useHistory();
  return (
    <Layout class="px-20 wrapper">
      <Header class="pt-4 flex space-x-7 items-center">
        <h2 class="flex-auto font-normal text-base">圖號座標<span class="font-bold text-2xl ml-7">{transformer.eachTransformerInfo.coor}</span></h2>
        {/* <button class="btn flex-none"><MessageOutlined />推播</button> */}
        <button class="btn flex-none" onClick={() => { _history.push(`/tr/search`) }}>返回列表</button>
      </Header>
      <Divider />
      <Layout class="flex justify-between py-2">
        <Content class="text-base tracking-widest space-y-5 flex-col">
          <div>所轄區處 :<span class="ml-2">{transformer.eachTransformerInfo.cust_city + transformer.eachTransformerInfo.cust_dist}</span></div>
          <div>資料表數 :<span class="ml-2">10 個</span></div>

        </Content>
        <Content class="text-base tracking-widest space-y-5 flex-col">
          <div>組別 :<span class="ml-2">{transformer.eachTransformerInfo.div}</span></div>
          <div>容量 :<span class="ml-2">160 kw</span></div>
        </Content>

        <Content class="relative flex-col w-80 gap-2" >
          <span class="relative text-base tracking-widest">利用率(%)：</span>
          <div class="flex mt-8 justify-left w-100 h-100 gap-2">
            
            <Progress percent={100} steps={5} size={80} status='active' strokeColor={[green[4], lime[4], yellow[4], orange[4], volcano[5]]} />
          </div>
          {/* <EChartRate /> */}
        </Content>

      </Layout>
      <Divider />


      <Layout>
        <Header class="flex items-center justify-between mb-14">
          {/* <div class="space-x-3 flex-1"></div> */}
          <div class="space-x-2 flex-1">
            <span class="text-base " style={{ fontSize: '14px' }}>期間選擇</span>

            <DatePicker onChange={onChangeMonth} picker="month" />

          </div>
          <h3 class="font-bold flex-1 text-center m-0 text-base">112 年度 每月用電圖表</h3>
          <div class="flex flex-1 items-center justify-end">
          <span class="border-2 border-gray-300 w-7 h-0 bg-green"></span>
            <span class="ml-2 mr-6">保證利用率</span>
            <span class="w-7 h-3 bg-green-500"></span>
            <span class="ml-2 mr-6">尖峰利用率</span>
            <span class="w-7 h-3 bg-green-300"></span>
            <span class="ml-2">離峰利用率</span>
          </div>

        </Header>

        <Content class="flex mb-20 justify-center items-center">
          <span class="min-w-max h-8 -mr-10 transform -rotate-90 text-center">利用率 (%)</span>
          <EChartMonth data={transformer.monthlyRatesList} />
        </Content>
      </Layout>


      <Divider />
      <Layout class="py-2">
        <Header class="flex items-center justify-between">

          <div class="space-x-2 flex-1">
            <span class="text-base " style={{ fontSize: '14px' }}>期間選擇</span>
            <DatePicker defaultValue={moment('2023/01', monthFormat)} format={monthFormat} picker="month" />
          </div>
          <h3 class="font-bold flex-1 text-center m-0 text-base"> 112 年度 10 月每日用電圖表</h3>
          <div class="flex flex-1 items-center justify-end">

            <span class="w-7 h-3 bg-green-500"></span>
            <span class="ml-2 mr-6">尖峰利用率</span>
            <span class="w-7 h-3 bg-green-300"></span>
            <span class="ml-2">離峰利用率</span>
          </div>
        </Header>
        <Content class="flex justify-center items-center mt-14 mb-20 w-full">
          <span class="min-w-max h-8 -mr-6 transform -rotate-90 text-center">利用率 (%)</span>
          <EChartMain data={transformer.dailyRatesList} />
          {/* <span class="min-w-max h-8 -ml-6 transform rotate-90 text-center">利用率 (%)</span> */}
        </Content>
      </Layout>

      <Layout>

        <Header class="flex items-center justify-between">
          <div class="space-x-3 flex-1">
            <span class="text-base " style={{ fontSize: '14px' }}>時間選擇</span>
            <TimePicker.RangePicker defaultValue={moment('12:08', Timeformat)} format={Timeformat} />

          </div>
          <h3 class="font-bold flex-1 text-center m-0 text-base">112 年 01 月 01 日 當日用電圖表</h3>

          <div class="flex flex-1 items-center justify-end">
            {/* <span class="border-2 border-black w-7 h-0 bg-green"></span>
            <span class="ml-2 mr-6">尖峰利用率</span> */}
            <span class="border-2 border-green-500 w-7 h-0 bg-green"></span>
            <span class="ml-2 mr-6">尖峰利用率</span>
          </div>

        </Header>


        <Content class="flex justify-center items-center mt-10 mb-20 w-full">
          <span class="min-w-max h-8 -mr-9 transform -rotate-90 text-center">利用率 (%)</span>
          <EChartDay data={transformer.quarterRatesList} />
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
export default connect(mapStateToProps, mapDispatchToProps)(TRInfo);

