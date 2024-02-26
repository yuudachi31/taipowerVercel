//antd
import { Layout, Divider, Row, Col, Modal, Form, Input, message, Cascader, Button, Select } from 'antd';
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
import { useHistory, useLocation } from "react-router-dom";
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
  const [isLoadingtop, setIsLoadingTop] = useState(true);
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

  //設定新變壓器Modal
  const [isaddFakeOpen, setIsaddFakeOpen] = useState(false);
  const [isaddExistOpen, setIsaddExistOpen] = useState(false);

  const showaddFakeModal = () => {
    setIsaddFakeOpen(true);
  };
  const handleCancel = () => {
    setIsaddFakeOpen(false);
    setIsaddExistOpen(false);
  };
  const handlefakeData = (values) => {
    console.log("虛擬變壓器資料", values);
    setIsaddFakeOpen(false);
  };

  const showaddExistModal = () => {
    setIsaddExistOpen(true);
  };
  const handleExistOk = () => {

    setIsaddExistOpen(false);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

    // console.log(transformer.dailyRatesList)
  useEffect(() => {
      const parsed = queryString.parse(window.location.search);
      getEachTransformer(parsed.coor, parsed.div, parsed.tr_index).then((data) => {
        if (data.errStatus) {
          console.log(data.errDetail);
        } else {
          setIsLoadingTop(false)
          saveEachTransInfo(data)
        }
      })
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

  const mockTags = ['01', '02', '03'];
  const lsags = ['燈', '力'];
  // 資料要寫在一起因為穿梭框是用key在判斷資料，不過在思考怎麼樣才比較好
  const EData = {
    coor: 'B6744HD20',
    cap: '50 KWA',
    div: 'T01',
    totalNum: 2,
    type: '燈力、力',
    mockData: [
      {
        id:'1',
        type: '燈力',
        data: Array.from({
          length: 10,
        }).map((_, i) => ({
          key: 'e' + i.toString(),
          title: `content${i + 1}`,
          description: `description of content${i + 1}`,
          electricityNum: `electricityNum of content${i + 1}`,
          priceDay: `${10 + (i % 4)}`,
          tenHour: "5%",
          KW: "1000 kw",
          address: `address of content${i + 1}`,
          tag: mockTags[i % 3],
          // 燈還是力
          lors: lsags[i % 2],
        })),
      },
      {
        id:'2',
        type: '力',
        data: Array.from({
          length: 10,
        }).map((_, i) => ({
          key: 'e' + i.toString(),
          title: `content${i + 1}`,
          description: `description of content${i + 1}`,
          electricityNum: `electricityNum of content${i + 1}`,
          priceDay: `${10 + (i % 4)}`,
          tenHour: "5%",
          KW: "1000 kw",
          address: `address of content${i + 1}`,
          tag: mockTags[i % 3],
          lors: '力',
        })),
      },
    ]
  };
  const PData = {
    coor: 'XXXXXXXXX',
    cap: '50 KWA',
    div: 'T02',
    totalNum: 3,
    type: '力、力、力',
    mockData: [
      {
        key: 'p1',
        id:'1',
        type: '力',
        data:'',
      },
      {
        key: 'p2',
        id:'2',
        type: '力',
        data:'',
      },
      {
        key: 'p3',
        id:'3',
        type: '力',
        data:'',
      },
    ]
  };
  const eDataTotalNum = EData.totalNum || 0;
  const pDataTotalNum = PData.totalNum || 0;

  // 找到最大的 totalNum
  const maxNum = Math.max(eDataTotalNum, pDataTotalNum);
  console.log('PData', PData, maxNum)

  // 取得所有的 id
  const allIds = [...new Set([...EData.mockData.map(item => item.id), ...PData.mockData.map(item => item.id)])];

  // 重新封裝資料
  const mergeData = allIds.map(id => {
    const EDataItem = EData.mockData.find(item => item.id === id) || { data: '' }
    const PDataItem = PData.mockData.find(item => item.id === id) || { data: '' }

    return { id, EDataItem, PDataItem };
  });

  //設定容量
  const opacityOptions = [
    {
      value: '10 KVA',
      label: '10 KVA',
    },
    {
      value: '50 KVA',
      label: '50 KVA',
    },
    {
      value: '100 KVA',
      label: '100 KVA',
    },
    {
      value: '150 KVA',
      label: '150 KVA',
    },
    {
      value: '200 KVA',
      label: '200 KVA',
    },
  ];

  //更新利用率loading
  const theresholdSuccess = () => {
    message.loading('正在計算並更新利用率中...', 3, () => {
      message.success('已更新！');
    });
  };

  console.log(mergeData);
  
  return (
    <Layout class="px-20 wrapper">
        {/* 設定虛擬變壓器 */}
        <Modal
          title="設定虛擬變壓器"
          open={isaddFakeOpen}
          // onOk={handleOk}
          onCancel={handleCancel}
          // okText="確認"
          // cancelText="取消"
          footer={null}
        >
          <Form
            labelCol={{
              span: 5,
            }}
            layout="horizontal"
            onFinish={handlefakeData}
          >
            <Form.Item label="變壓器名稱" name="變壓器名稱"  rules={[{ required: true, message: '請輸入變壓器名稱',} ]}>
              <Input placeholder="請輸入變壓器名稱"/>
            </Form.Item>
            <Form.Item label="群組名稱" name="群組名稱"  rules={[{ required: true, message: '請輸入群組名稱',} ]}>
              <Input placeholder="請輸入群組名稱"/>
            </Form.Item>
            <Form.Item label="變壓器型態" name="變壓器型態" rules={[
              {
                required: true,
                message: '請選擇變壓器型態',
              },
            ]}>
              <Cascader
                placeholder="請選擇變壓器型態"
                options={[
                  {
                    value: '一具',
                    label: '一具',
                    children: [
                      {
                        value: '燈',
                        label: '燈',
                      },
                    ],
                  },
                  {
                    value: '二具',
                    label: '二具',
                    children: [
                      {
                        value: '燈、力',
                        label: '燈、力',
                      },
                      {
                        value: '力、力',
                        label: '力、力',
                      },
                    ],
                  },
                  {
                    value: '三具',
                    label: '三具',
                    children: [
                      {
                        value: '力、力、力',
                        label: '力、力、力',
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="容量" name="容量" rules={[{ required: true,  message: '請輸入容量'} ]}>
              <Select
                placeholder="請選擇容量"
                style={{
                  width: 200,
                }}
                options= {opacityOptions}
              />
            </Form.Item>
            <Form.Item style={{textAlign: 'right',}}> 
              <Button style={{marginRight:'8px'}} htmlType="button" onClick={handleCancel}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                確認
              </Button>
          </Form.Item>
          </Form>
      </Modal>
      {/* 選擇既有變壓器 */}
      <Modal
          title="選擇既有變壓器"
          open={isaddExistOpen}
          onOk={handleExistOk}
          onCancel={handleCancel}
          okText="確認"
          cancelText="取消"
          style={{display:'flex', justifyContent:'space-between'}}
        >
          <span>變壓器：</span>
          <Select
            style={{
              width: 400,
            }}
            showSearch
            placeholder="請選擇變壓器"
            optionFilterProp="children"
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: 'B6744HD57',
                label: 'B6744HD57',
              },
              {
                value: 'B6744GD11',
                label: 'B6744GD11',
              },
              {
                value: 'B6744GD11',
                label: 'B6744GD11',
              },
            ]}
          />
      </Modal>
      <Header class="pt-4 flex space-x-7 items-center">
        <h2 class="flex-auto font-normal text-base">圖號座標<span class="font-bold text-2xl ml-7">{transformer.eachTransformerInfo.coor}</span></h2>
        {/* <button class="btn flex-none"><MessageOutlined />推播</button> */}
        <button class="btn flex" type="primary" onClick={() => { _history.goBack() }}>返回上一頁</button>
      </Header>
      <Divider />

      {/* 負載變壓器資料*/}
      <Layout class="flex justify-between py-2">
        <Content class="text-base tracking-widest space-y-5 flex-col">
          <div>所轄區處 :<span class="ml-2">{transformer.eachTransformerInfo.addr}</span></div>
          <div>住戶表數 :<span class="ml-2">10 個（6 個 AMI）</span></div>
          <div>AMI資料完整度 :<span class="ml-2">10 %</span></div>
        </Content>
        <Content class="text-base tracking-widest space-y-5 flex-col">
          <div>組別 :<span class="ml-2">{transformer.eachTransformerInfo.div}</span></div>
          <div>容量 :<span class="ml-2">{transformer.eachTransformerInfo.cap} KVA</span></div>
          {/* <div>日期 :{selectedMonth ? (<span class="ml-2">{selectedYear} 年度 {selectedMonth} 月每日用電圖表</span>) : (<span class="ml-2">2022 年度 6 月每日用電圖表</span>)}</div> */}
        </Content>
        <Content class="flex justify-end w-50 gap-2" >
          <div class="flex w-100 h-100 gap-2" style={{ alignItems:'end' }}>
            <button class="btn btn-orange bg-orange-400 flex-end" type="primary" onClick={showaddExistModal}>選擇既有變壓器</button>
            <button class="btn btn-orange bg-orange-400 flex-end" type="primary" onClick={showaddFakeModal}>新增虛擬變壓器</button>
          </div>
          {/* <EChartRate /> */}
        </Content>
      </Layout>

      {/* 負載變壓器規劃 */}
      <Divider />
      <Layout class="py-1 pb-20">
        <h2 class="flex-auto font-normal text-base font-bold">負載變壓器規劃</h2>
        <Row>
          <Col span={12}><div class="font-bold text-normal">原變壓器：T01</div></Col>
          <Col span={12}><div class="font-bold text-normal">新變壓器：虛擬/既設變壓器組別名稱</div></Col>
        </Row>
        
        {/* 每具資料 */}
        {Array.from({ length: maxNum }).map((_, index) => (
          <Content class='mt-5'>
            <Row key={index}>
              <Col span={12}>
                {EData.mockData[index] && (
                  <div class="text-orange-400 mb-2">{`第${index + 1}具：${EData.mockData[index].type}`}</div>
                )}
              </Col>
              <Col span={12}>
                {PData.mockData[index] && (
                  <div class="text-orange-400 mb-2">{`第${index + 1}具：${PData.mockData[index].type}`}</div>
                )}
              </Col>
            </Row>
            <Content class="predict-box">
              <PredictList data={mergeData[index]}/>
              <div class="flex" style={{justifyContent:'flex-end'}}>
                <button class="btn btn-orange bg-orange-400 mt-5" type="primary" onClick={theresholdSuccess}>更新利用率</button>
              </div>
              
            </Content>
          </Content>
        ))}

        {/* 結束與匯出 */}
        {/* </div> */}
        <Content class="flex justify-end w-50 gap-2 mt-5" >
          <div class="flex w-100 h-100 gap-2">
            <button class="btn btn-red bg-red-400 flex-end" type="primary" onClick={() => { _history.push(`/EChartMonthPage`) }}>結束規劃</button>
            <button class="btn-orange-outline border-orange-400 flex-end" onClick={() => { _history.push(`/EChartMonthPage`) }}>匯出規劃</button>
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

