//antd
import { Layout, Divider, Row, Col, Modal, Form, Input, message, Cascader, Button, Select } from 'antd';
import { saveDailyRates, saveQuarterRates, saveMonthlyRates, saveEachTransInfo } from '../../actions/transformer'
import { getDailyRates, getQuarterRates, getMonthlyRates, getEachTransformer } from '../../api/frontApi'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import PredictList from './PredictList'
import predictTestData from './predictTestData.json'


const { Header, Sider, Content } = Layout;

function Predict({ transformer, saveEachTransInfo }) {
  // const parsed = queryString.parse(window.location.search);
  const [isLoadingtop, setIsLoadingTop] = useState(true);
  // const [isDataSwitch, setIsDataSwitch] = useState(false); //資料是否已切換，尚未成功

  //設定選擇虛擬或是記設變壓器的變壓器資料
  //手動分包檔案 ori：原本的、new：新設的、light：燈、power：力
  //分三具包
  const mockLightTags = ['A', 'B', 'C', 'D', 'E'];
  const mockPowerTags = ['F', 'G', 'H', 'I', 'J'];
  const existIndexData = { //選擇既有變壓器
    index1: {  
        type: {
            oriType: '燈力',
            newType: '力',
        },
        light: { //只有原變壓器
            disabled: true,
            ori: {
                id:'1',
                coor: 'B6744GD33',
                div: 'T01',
                tr_index:'1',
                type: '燈',
                thereshold: '50%',
                data: Array.from({
                    length: 10,
                }).map((_, i) => ({
                    key: `ori${i + 1}`,
                    title: `content${i + 1}`,
                    electricityNum: `002709811${i + 1}`,
                    tenHour: "5%",
                    address: `台北市松山區XXXXX${i + 1}`,
                    tag: mockLightTags[i % 5],
                })),
            },
            new: {
              coor: '',
              thereshold: '0%',
            },
            // targetKey: [],
        },
        power: { //新、舊變壓器
            disabled: false,
            ori: {
                id:'2',
                coor: 'B6744GD33',
                div: 'T01',
                tr_index:'1',
                type: '力',
                thereshold: '60%',
                data: Array.from({
                    length: 10,
                }).map((_, i) => ({
                    key: `ori${i + 1}`,
                    title: `content${i + 1}`,
                    electricityNum: `002709800${i + 1}`,
                    tenHour: "5%",
                    address: `台北市松山區XXXXX${i + 1}`,
                    tag: mockPowerTags[i % 5],
                })),
            },
            new: {
                id:'1',
                coor: 'B6744GD33',
                div: 'T02',
                tr_index:'1',
                type: '力',
                thereshold: '30%',
                data: Array.from({
                    length: 10,
                }).map((_, i) => ({
                    key: `pre${i + 1}`,
                    title: `content${i + 1}`,
                    electricityNum: `002709888${i + 1}`,
                    tenHour: "5%",
                    address: `台北市松山區XXXXX${i + 1}`,
                    tag: mockPowerTags[i % 5],
                })),
            },
            // targetKey: [],
        }
    },
    index2: {
        type: {
            oriType: '力',
            newType: '力',
        },
        light: {
            disabled: true, 
            ori:{
              coor: '',
              thereshold: '0%',
            }, 
            new:{
              coor: '',
              thereshold: '0%',
            }, 
            // targetKey: [],
        }, //皆沒有資料
        power: { //新、舊變壓器
            disabled: false,
            ori: {
                id:'3',
                coor: 'B6744GD33',
                div: 'T01',
                tr_index:'2',
                type: '力',
                thereshold: '75%',
                data: Array.from({
                    length: 10,
                }).map((_, i) => ({
                    key: `ori${i + 11}`,
                    title: `content${i + 1}`,
                    electricityNum: `002709822${i + 1}`,
                    tenHour: "5%",
                    address: `台北市松山區XXXXX${i + 1}`,
                    tag: mockPowerTags[i % 5],
                })),
            },
            new: {
                id:'2',
                coor: 'B6744GD33',
                div: 'T02',
                tr_index:'2',
                type: '力',
                thereshold: '50%',
                data: Array.from({
                    length: 10,
                }).map((_, i) => ({
                    key: `pre${i + 21}`,
                    title: `content${i + 1}`,
                    electricityNum: `002709855${i + 1}`,
                    tenHour: "5%",
                    address: `台北市松山區XXXXX${i + 1}`,
                    tag: mockPowerTags[i % 5],
                })),
            },
            // targetKey: [],
        }
    },
    index3: {
        type: {
            oriType: '',
            newType: '力',
        },
        light: {
            disabled: true, 
            ori:{
              coor: '',
              thereshold: '0%',
            }, 
            new:{
              coor: '',
              thereshold: '0%',
            },
            // targetKey: [],
        }, //皆沒有資料
        power: { //新變壓器
            disabled: true,
            ori: {
              coor: '',
              thereshold: '0%',
            },
            new: {
                id:'3',
                coor: 'B6744GD33',
                div: 'T02',
                tr_index:'3',
                type: '力',
                thereshold: '40%',
                data: Array.from({
                    length: 10,
                }).map((_, i) => ({
                    key: `pre${i + 31}`,
                    title: `content${i + 1}`,
                    electricityNum: `002709833${i + 1}`,
                    tenHour: "5%",
                    address: `台北市松山區XXXXX${i + 1}`,
                    tag: mockPowerTags[i % 5],
                })),
            },
              // targetKey: [],
          }
      }
  };

  const fakeIndexData = { //選擇虛擬變壓器
    index1: {   
      type:{
        oriType: '燈力',
        newType: '力、力',
      }, 
      light: { //只有原變壓器
        disabled: true,
        ori: {
          id:'1',
          coor: 'B6744GD33',
          div: 'T01',
          tr_index:'1',
          type: '燈',
          thereshold: '50%',
          data: Array.from({
            length: 10,
          }).map((_, i) => ({
            key: `ori${i + 1}`,
            title: `content${i + 1}`,
            electricityNum: `002709800${i + 1}`,
            tenHour: "5%",
            address: `台北市松山區XXXXX${i + 1}`,
            tag: mockLightTags[i % 5],
          })),
        },
        new: {
          coor: '',
          thereshold: '0%',
        },
      },
      power: { //新、變壓器
        disabled: false,
        ori: {
          id:'2',
          coor: 'B6744GD33',
          div: 'T01',
          tr_index:'1',
          type: '力',
          thereshold: '60%',
          data: Array.from({
            length: 10,
          }).map((_, i) => ({
            key: `ori${i + 1}`,
            title: `content${i + 1}`,
            electricityNum: `002709800${i + 1}`,
            tenHour: "5%",
            address: `台北市松山區XXXXX${i + 1}`,
            tag: mockPowerTags[i % 5],
          })),
        },
        new: {
          id:'1',
          coor: 'B6744GD33',
          div: 'T02',
          tr_index:'1',
          type: '力',
          thereshold: '30%',
          data: Array.from({
            length: 10,
          }).map((_, i) => ({
            key: `pre${i + 1}`,
            title: `content${i + 1}`,
            electricityNum: `002709888${i + 1}`,
            tenHour: "5%",
            address: `台北市松山區XXXXX${i + 1}`,
            tag: mockPowerTags[i % 5],
          })),
        }
      }
      },
    index2: {
      type:{
        oriType: '力',
        newType: '',
      },
      light: { 
        disabled: true, 
        ori: {
          coor: '',
          thereshold: '0%',
        }, 
        new: {
          coor: '',
          thereshold: '0%',
        },
      }, //皆沒有資料
      power: {
        disabled: false,
        ori: {
          id:'3',
          coor: 'B6744GD33',
          div: 'T01',
          tr_index:'2',
          type: '力',
          thereshold: '75%',
          data: Array.from({
            length: 10,
          }).map((_, i) => ({
            key: `ori${i + 1}`,
            title: `content${i + 1}`,
            electricityNum: `002709800${i + 1}`,
            tenHour: "5%",
            address: `台北市松山區XXXXX${i + 1}`,
            tag: mockPowerTags[i % 5],
          })),
        },
        new: {
          id:'2',
          coor: 'B6744GD33',
          div: 'T02',
          tr_index:'2',
          type: '力',
          thereshold: '50%',
          data: Array.from({
            length: 10,
          }).map((_, i) => ({
            key: `pre${i + 1}`,
            title: `content${i + 1}`,
            electricityNum: `002709855${i + 1}`,
            tenHour: "5%",
            address: `台北市松山區XXXXX${i + 1}`,
            tag: mockPowerTags[i % 5],
          })),
        }
      } ///新、舊變壓器
    },
  }
  const oriIndexData = { //一開始變壓器資料
    index1: {   
      type:{
        oriType: '燈力',
        newType: '',
      }, 
      light: { //只有原變壓器
        disabled: true,
        ori: {
          id:'1',
          coor: 'B6744GD33',
          div: 'T01',
          tr_index:'1',
          type: '燈',
          thereshold: '50%',
          data: Array.from({
            length: 10,
          }).map((_, i) => ({
            key: `ori${i + 1}`,
            title: `content${i + 1}`,
            electricityNum: `002709800${i + 1}`,
            tenHour: "5%",
            address: `台北市松山區XXXXX${i + 1}`,
            tag: mockLightTags[i % 5],
          })),
        },
        new: {
          coor: '',
          thereshold: '0%',
        },
      },
      power: { //只有原變壓器
        disabled: true,
        ori: {
          id:'2',
          coor: 'B6744GD33',
          div: 'T01',
          tr_index:'1',
          type: '力',
          thereshold: '60%',
          data: Array.from({
            length: 10,
          }).map((_, i) => ({
            key: `ori${i + 1}`,
            title: `content${i + 1}`,
            electricityNum: `002709800${i + 1}`,
            tenHour: "5%",
            address: `台北市松山區XXXXX${i + 1}`,
            tag: mockPowerTags[i % 5],
          })),
        },
        new: {
          coor: '',
          thereshold: '0%',
        },
      }
      },
    index2: {
      type:{
        oriType: '力',
        newType: '',
      },
      light: { 
        disabled: true, 
        ori: {
          coor: '',
          thereshold: '0%',
        }, 
        new: {
          coor: '',
          thereshold: '0%',
        },
      }, //皆沒有資料
      power: {
        disabled: true,
        ori: {
          id:'3',
          coor: 'B6744GD33',
          div: 'T01',
          tr_index:'2',
          type: '力',
          thereshold: '75%',
          data: Array.from({
            length: 10,
          }).map((_, i) => ({
            key: `ori${i + 1}`,
            title: `content${i + 1}`,
            electricityNum: `002709800${i + 1}`,
            tenHour: "5%",
            address: `台北市松山區XXXXX${i + 1}`,
            tag: mockPowerTags[i % 5],
          })),
        },
        new: {
          coor: '',
          thereshold: '0%',
        },
      } ///只有原變壓器
    },
  }
  //一開始只有原變壓器有資料
  const [updateIndexData, setupdateIndexData] = useState(oriIndexData);
  // console.log('indexData', updateIndexData, updateIndexData.index1.type.oriType)

  //設定新變壓器Modal
  const [isaddFakeOpen, setIsaddFakeOpen] = useState(false);
  const [isaddExistOpen, setIsaddExistOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedTransformerType, setSelectedTransformerType] = useState([]);
  
  const handleCancel = () => {
    // 清空表單數據和選擇的變壓器型態
    setFormData({});
    setSelectedTransformerType([]);
    setIsaddFakeOpen(false);
    setIsaddExistOpen(false);
  };
  const showaddFakeModal = () => {
    setIsaddFakeOpen(true);
  };

  const handlefakeData = (values) => {
    console.log("虛擬變壓器資料", values);
    setupdateIndexData(fakeIndexData)
    // setIsDataSwitch(true)
    setIsaddFakeOpen(false);
  };

  const showaddExistModal = () => {
    setIsaddExistOpen(true);
  };
  const handleExistOk = () => {
    setupdateIndexData(existIndexData)
    // setIsDataSwitch(true)
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

  const mockTags = ['XX', 'XX', 'XX'];
  // 資料要寫在一起因為穿梭框是用key在判斷資料，不過在思考怎麼樣才比較好
  const EData = { //原變壓器
    coor: 'B6744GD33',
    cap: '50 KWA',
    div: 'T01',
    // totalNum: 2,
    type: '燈力、力',
    mockData: [
      {
        id:'1',
        coor: 'B6744GD33',
        div: 'T01',
        tr_index:'1',
        type: '燈',
        data: Array.from({
          length: 10,
        }).map((_, i) => ({
          key: `ori${i + 1}`,
          title: `content${i + 1}`,
          electricityNum: `002709800${i + 1}`,
          tenHour: "5%",
          address: `台北市松山區XXXXX${i + 1}`,
          tag: mockTags[i % 3],
        })),
      },
      {
        id:'2',
        coor: 'B6744GD33',
        div: 'T01',
        tr_index:'1',
        type: '力',
        data: Array.from({
          length: 10,
        }).map((_, i) => ({
          key: `ori${i + 1}`,
          title: `content${i + 1}`,
          electricityNum: `002709800${i + 1}`,
          tenHour: "5%",
          address: `台北市松山區XXXXX${i + 1}`,
          tag: mockTags[i % 3],
        })),
      },
      {
        id:'3',
        coor: 'B6744GD33',
        div: 'T01',
        tr_index:'2',
        type: '力',
        data: Array.from({
          length: 10,
        }).map((_, i) => ({
          key: `ori${i + 1}`,
          title: `content${i + 1}`,
          electricityNum: `002709800${i + 1}`,
          tenHour: "5%",
          address: `台北市松山區XXXXX${i + 1}`,
          tag: mockTags[i % 3],
        })),
      },
    ]
  };
  const PData = { //新變壓器
    coor: 'B6744GD11',
    cap: '167 KWA',
    div: 'T02',
    // totalNum: 3,
    type: '力、力、力',
    mockData: [
      {
        id:'1',
        coor: 'B6744GD33',
        div: 'T02',
        tr_index:'1',
        type: '力',
        data: Array.from({
          length: 10,
        }).map((_, i) => ({
          key: `pre${i + 1}`,
          title: `content${i + 1}`,
          electricityNum: `002709800${i + 1}`,
          tenHour: "5%",
          address: `台北市松山區XXXXX${i + 1}`,
          tag: mockTags[i % 3],
        })),
      },
      {
        id:'2',
        coor: 'B6744GD33',
        div: 'T02',
        tr_index:'2',
        type: '力',
        data: Array.from({
          length: 10,
        }).map((_, i) => ({
          key: `pre${i + 1}`,
          title: `content${i + 1}`,
          electricityNum: `002709800${i + 1}`,
          tenHour: "5%",
          address: `台北市松山區XXXXX${i + 1}`,
          tag: mockTags[i % 3],
        })),
      },
      {
        id:'3',
        coor: 'B6744GD33',
        div: 'T02',
        tr_index:'3',
        type: '力',
        data: Array.from({
          length: 10,
        }).map((_, i) => ({
          key: `pre${i + 1}`,
          title: `content${i + 1}`,
          electricityNum: `002709800${i + 1}`,
          tenHour: "5%",
          address: `台北市松山區XXXXX${i + 1}`,
          tag: mockTags[i % 3],
        })),
      },
    ]
  };
  // const eDataTotalNum = EData.totalNum || 0;
  // const pDataTotalNum = PData.totalNum || 0;

  //設定容量 25 50 100 167
  const opacityOptions = [
    {
      value: '25 KVA',
      label: '25 KVA',
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
      value: '167 KVA',
      label: '167 KVA',
    },
  ];
  //設定虛擬變壓器容量select
  const capacitySelect = () => {
    if (selectedTransformerType.includes('燈')) {
      return (
        <Form.Item label="燈容量" name="燈容量" rules={[{ required: true,  message: '請輸入燈容量'} ]}>
          <Select
            placeholder="請選擇燈容量"
            style={{
              width: 200,
            }}
            options= {opacityOptions}
          />
        </Form.Item>
      );
    } else if (selectedTransformerType.includes('力、力') || selectedTransformerType.includes('力、力、力')) {
      return (
        <Form.Item label="力容量" name="力容量" rules={[{ required: true,  message: '請輸入力容量'} ]}>
          <Select
            placeholder="請選擇力容量"
            style={{
              width: 200,
            }}
            options= {opacityOptions}
          />
        </Form.Item>
      );
    } else if (selectedTransformerType.includes('燈、力')) {
      return (
        <>
         <Form.Item label="燈容量" name="燈容量" rules={[{ required: true,  message: '請輸入燈容量'} ]}>
          <Select
            placeholder="請選擇燈容量"
            style={{
              width: 200,
            }}
            options= {opacityOptions}
          />
        </Form.Item>
        <Form.Item label="力容量" name="力容量" rules={[{ required: true,  message: '請輸入力容量'} ]}>
          <Select
            placeholder="請選擇力容量"
            style={{
              width: 200,
            }}
            options= {opacityOptions}
          />
        </Form.Item>
        </>
      );
    }
  };

  //設定既有變壓器select
  const totalCoorData = ['B6744GD33', 'B6744GD11', 'B6744GD72'];
  const coorData = {
    B6744GD33: ['T01'],
    B6744GD11: ['T01', 'T02', 'T03', 'T04'],
    B6744GD72: ['T01'],
  };
  const [coors, setCoors] = useState(coorData[totalCoorData[0]]);
  const [secondDiv, setSecondDiv] = useState(coorData[totalCoorData[0]][0]);
  const handleExistCoorChange = (value) => {
    setCoors(coorData[value]);
    setSecondDiv(coorData[value][0]);
  };
  const onSecondDivChange = (value) => {
    setSecondDiv(value);
  };


  // console.log(mergeData);
  
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
            initialValues={formData}
            onValuesChange={(changedValues, allValues) => {
              setFormData(allValues);
            }}
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
                onChange={(value) => {
                  setSelectedTransformerType(value);
                }}
              />
            </Form.Item>
            {capacitySelect()}
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
              width: 200,
              marginRight:'8px',
            }}
            defaultValue={totalCoorData[0]}
            showSearch
            placeholder="請選擇變壓器"
            optionFilterProp="children"
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onChange={handleExistCoorChange}
            options={totalCoorData.map((coor) => ({
              label: coor,
              value: coor,
            }))}
          />
          <Select
            style={{
              width: 120,
            }}
            value={secondDiv}
            onChange={onSecondDivChange}
            options={coors.map((coor) => ({
              label: coor,
              value: coor,
            }))}
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
          <Col span={12}>
            <div class="text-normal">原變壓器：{transformer.eachTransformerInfo.coor}</div>
            <div class="text-normal">組別：{transformer.eachTransformerInfo.div}</div>
            <div class="text-normal">變壓器型態：{EData.type}</div>
          </Col>
          <Col span={12}>
            <div class="text-normal">新變壓器：虛擬/既設變壓器組別名稱 {PData.coor}</div>
            <div class="text-normal">組別：{PData.div}</div>
            <div class="text-normal">變壓器型態：{PData.type}</div>
          </Col>
        </Row>
        
        {/* 每具資料 */}
        <Content class='mt-5'>
          {Object.keys(updateIndexData).map((key, index) => (
            <div key={index}>
              <Row>
                <Col span={12}>
                  {updateIndexData[key].type.oriType ? (
                    <div class="text-orange-400 mb-2">{`第${index + 1}具：${updateIndexData[key].type.oriType}`}</div>
                  ) : (
                    <div class="text-orange-400 mb-2">{`第${index + 1}具：無資料`}</div>
                  )}
                </Col>
                <Col span={12}>
                  {updateIndexData[key].type.newType ? (
                    <div class="text-orange-400 mb-2">{`第${index + 1}具：${updateIndexData[key].type.newType}`}</div>
                  ) : (
                    <div class="text-orange-400 mb-2">{`第${index + 1}具：無資料`}</div>
                  )}
                </Col>
              </Row>
              <Content class="predict-box mb-2">
                <PredictList 
                  indexData = {updateIndexData[key]} 
                  // isDataSwitch = {isDataSwitch}
                />
              </Content>
            </div>
          ))}
        </Content>

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

