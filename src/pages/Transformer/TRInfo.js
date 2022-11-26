//antd
import { Layout, Divider, DatePicker } from 'antd';
import { MessageOutlined, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import EChartMain from '../../components/chart/EChartMain';
import EChartDay from '../../components/chart/EChartDay';
import { data_main, data_month }  from '../../components/chart/TempData'

const { Header, Sider, Content } = Layout;

const monthFormat = 'YYYY 年 MM 月';

function TRInfo() {
  return (
    <Layout class="px-20 wrapper">
      <Header class="pt-4 flex space-x-7 items-center">
        <h2 class="flex-auto font-normal text-base">圖號座標<span class="font-bold text-2xl ml-7">B3729DE2437</span></h2>
        <button class="btn flex-none"><MessageOutlined />推播</button>
        <button class="btn flex-none">返回列表</button>
      </Header>
      <Divider />
      <Layout class="flex justify-between py-2">
        <Content class="text-base tracking-widest space-y-5 flex-col">
          <div>所轄區處 :<span class="ml-2">桃園市桃園區</span></div>
          <div>資料表數 :<span class="ml-2">10 個</span></div>
          <div>容量 :<span class="ml-2">160 VA</span></div>
        </Content>
        {/* <Sider class="border-2 border-red-600">
                  利用率：
              </Sider> */}
      </Layout>
      <Divider />
      <Layout class="py-2">
        <Header class="flex items-center justify-between">
          <div class="space-x-3 flex-1">
            <span class="text-base">期間選擇</span>
            <DatePicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} picker="month" />
          </div>
          <h3 class="font-bold flex-1 text-center m-0 text-base">111 年度 01 月每日用電圖表</h3>
          <div class="flex flex-1 items-center justify-end">
            <span class="border-2 border-black w-7 h-3 bg-green"></span>
            <span class="ml-2 mr-6">尖峰利用率</span>
            <span class="w-7 h-3 bg-green-500"></span>
            <span class="ml-2 mr-6">尖峰</span>
            <span class="w-7 h-3 bg-green-300"></span>
            <span class="ml-2">離峰</span>
          </div>
        </Header>
        <Content class="flex justify-center items-center mt-14 mb-20 w-full">
          <span class="min-w-max h-8 -mr-6 transform -rotate-90 text-center">負載量 (kW)</span>
          <EChartMain data={data_main}/>
          <span class="min-w-max h-8 -ml-6 transform rotate-90 text-center">利用率 (%)</span>
        </Content>
      </Layout>
      <Divider />
      <Layout class="grid grid-cols-2 gap-10">
        <Layout>
          <Header class="h-20 mb-3">
            <h3 class="font-bold text-base">111 年度 每月用電圖表</h3>
          </Header>
          <Content class="mb-20">
            <EChartMain data={data_month} />
          </Content>
        </Layout>
        <Layout>
          <Header class="h-20 mb-3">
            <h3 class="font-bold text-base">111 年 01 月 01 日 當日用電圖表</h3>
            <div class="flex items-center justify-center mt-6">
              <button class="flex"><CaretLeftOutlined style={{ color: '#7ACA00' }} /></button>
              <span class="leading-none border-1 py-1 px-5 mx-5">10:00 - 13:45</span>
              <button class="flex"><CaretRightOutlined style={{ color: '#7ACA00' }} /></button>
            </div>
          </Header>
          <Content class="mb-20">
            <EChartDay />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );

}
export default TRInfo;
