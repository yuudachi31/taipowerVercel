//antd
import { Layout, Divider, DatePicker, Progress, TimePicker, message, Spin, Input, Button, Row, Col, Modal } from 'antd';

import { MessageOutlined, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { red, green, lime, yellow, orange, volcano } from '@ant-design/colors';
import styles from '../../index.less'
import moment from 'moment';
import { saveDailyRates, saveQuarterRates, saveMonthlyRates,saveMonthlyKnnRates,saveMonthlyTenRates,saveMonthlyGuartRates, saveEachTransInfo } from '../../actions/transformer'
import EChartMain from '../../components/chart/EChartMain';
import EChartDay from '../../components/chart/EChartDay';
import EChartMonth from '../../components/chart/EChartMonth';
// import EChartRate from '../../components/chart/EChartRate';
import { data_main, data_month } from '../../components/chart/TempData'
import { getAbnormalTransListForTrSearch, getDailyRates, getQuarterRates, getMonthlyRates,getMonthlyKnnRates,getMonthlyTenRates, getEachTransformer, getMonthRatesRange,getMonthlyGuartRates, postUser } from '../../api/frontApi'
import { connect } from 'react-redux';
import ErrorModal from '../../components/ErrorModal'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
// import queryString from "query-string";
import qs from "qs"
const { Search } = Input;
const { Header, Sider, Content } = Layout;
const containerStyle = {
  width: '100%',
  height: 200,
  overflow: 'auto',
  // border: '1px solid #f0f0f0',
  padding: '4px 8px 4px 8px',
  borderRadius: '3px'
};
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

function TRNewSearch({ transformer, saveDailyRates, saveQuarterRates, saveMonthlyRates,saveMonthlyKnnRates,saveMonthlyTenRates,saveMonthlyGuartRates, saveEachTransInfo }) {
  const parsed = qs.parse(window.location.search);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isLoadingtop, setIsLoadingTop] = useState(false);
  const [isLoadingbottom, setIsLoadingbottom] = useState(false);
  const [isLoadingKnn, setIsLoadingKnn] = useState(false);
  const [isLoadingTen, setIsLoadingTen] = useState(false);
  const [isLoadingGuart, setIsLoadingGuart] = useState(false);

  const [isdateLoading, setDateLoading] = useState(true)
  const [abnormalTransData, setAbnormalTransData] = useState([]);
  const [isModalDataLoading, setIsModalDataLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [coor, setCoor] = useState('');
  const [div, setDiv] = useState('');
  const [tr_index, setTrIndex] = useState('');
  const [errorStatus, setErrorStatus] = useState(200);
  const [interval, setInterval] = useState(
    {
      "min_year": 2022,
      "min_month": 5,
      "min_day": 1,
      "max_year": 2023,
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
  // const handlemonthChange = (value, mode) => {
  //   if (mode === 'month') {
  //     setSelectedYear(value.year());
  //     setSelectedMonth(value.month());
  //   }
  // };
  const handledayChange = (value, mode) => {

    setSelectedDay(mode);

  };
  // console.log(transformer.dailyRatesList)

  const handlePanelChange = (value, mode) => {
    if (mode === 'year') {
      setSelectedYear(value.year());
      saveMonthlyRates([{
        is_predict: 3,

      }])
      setIsLoadingbottom(true)
      // getMonthlyRates(parsed.coor, parsed.div, parsed.tr_index, value.year()).then((data) => {
      getMonthlyRates(coor, div, tr_index).then((data) => {

        if (data.errStatus) {
          console.log(data.errDetail);
        } else {
          setIsLoadingbottom(false)
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
      setSelectedMonth(value.month());
      // const parsed = queryString.parse(window.location.search);
      console.log(value.year())
      // getDailyRates(parsed.coor, parsed.div, parsed.tr_index, value.year(), value.month() + 1).then((data) => {
      //   if (data.errStatus) {
      //     console.log(data.errDetail);
      //   } else {

      //     saveDailyRates(data)
      //   }
      // })
    }
  }
  // console.log(transformer.dailyRatesList)
  useEffect(() => {

    saveMonthlyRates([{
      is_predict: 3,

    }])
    saveEachTransInfo([{
      coor: "",
      addr: "",
      div: "",
      cap: "",
      uti_rate: ""

    }])
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
    // getMonthlyRates(parsed.coor, parsed.div, parsed.tr_index, 2022).then((data) => {
    //   if (data.errStatus) {
    //     console.log(data.errDetail);
    //   } else {
    //     setIsLoadingbottom(false)
    //     saveMonthlyRates(data)
    //   }
    // })

    // getMonthRatesRange(parsed.coor, parsed.div, parsed.tr_index, 2022).then((data) => {
    //   if (data.errStatus) {
    //     console.log(data.errDetail);
    //   } else {
    //     setInterval({
    //       ...data[0],
    //       "min_month": 1,
    //       "min_day": 1,
    //       "max_month": 12,
    //       "max_day": 31
    //     })

    //   }
    // })

    // getEachTransformer(parsed.coor, parsed.div, parsed.tr_index).then((data) => {
    //   if (data.errStatus) {
    //     console.log(data.errDetail);
    //   } else {
    //     setIsLoadingTop(false)
    //     saveEachTransInfo(data)
    //   }
    // })

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
    // postEmailNotify(params)
    // const resetTime = localStorage.getItem('resetTime');
    const lastPopupDate = localStorage.getItem('lastPopupDate');
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10);
    // console.log(todayString)

    // 设置定时器，在凌晨12点时清除弹窗记录
    const clearPopupAtMidnight = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        localStorage.removeItem('lastPopupDate');
      }
    };

    // 每隔一段时间检查是否到达凌晨12点
    const interval = setInterval(clearPopupAtMidnight, 60000); // 每分钟检查一次



    // // 在组件加载时设置一个定时器，用于在几秒后显示 Modal
    // const timer = setTimeout(() => {
    //     setIsModalVisible(true);
    // }, 500); // 在这里设置显示 Modal 的延迟时间，单位是毫秒
    // // 在組件卸載時清除定時器，以避免記憶體洩漏
    // return () => clearTimeout(timer);

    const reloadusr = document.cookie?.split("; ").find((row) => row.startsWith("usr"))?.split("=")[1]
    const reloadpsw = document.cookie?.split("; ").find((row) => row.startsWith("psw"))?.split("=")[1]

    getAbnormalTransListForTrSearch().then((data) => {
      if (data == 401) {
        if (Number(localStorage.getItem('resetTime')) == 5) {
          // console.log(Number(localStorage.getItem('resetTime')))

          // console.log("aabb")
          localStorage.removeItem('resetTime');

          setErrorStatus(data)
          setIsErrorModalOpen(true)
        } else if (Number(localStorage.getItem('resetTime')) < 8 && Number(localStorage.getItem('resetTime')) >= 1) {
          // console.log(Number(localStorage.getItem('resetTime')))

          postUser(reloadusr, reloadpsw).then((data) => {
            if (data && data.errStatus) {
              message.error(data.errDetail);
            } else {
              document.cookie = "fltk=" + data.access_token + ";path=/";
              localStorage.setItem('resetTime', Number(localStorage.getItem('resetTime')) + 1)
              // console.log("re")
              window.location.reload()
            }

          })

        } else {
          localStorage.setItem('resetTime', 1)
          // console.log(Number(localStorage.getItem('resetTime')))
          window.location.reload()
        }


      } else {
        document.cookie = "usr=''" + ";path=/";
        document.cookie = "psw=''" + ";path=/";
        localStorage.removeItem('resetTime');
        // getAbnormalTransListForTrSearch().then((data) => {
        //   if (data >= 400 && data <= 500) {
        //     setErrorStatus(data)
        //     setIsErrorModalOpen(true)

        //   } else {

        // console.log(data)
        setAbnormalTransData(data)
        // pushData()
        console.log("saveall")
        setIsModalDataLoading(false)
        //   }
        // })
        // console.log(data)
        // saveTransData(data)
        setIsLoading(false)
        if (!lastPopupDate || lastPopupDate !== todayString) {
          // 如果是第一次弹出或者上次弹出的日期不是今天，则弹出 Modal
          setIsModalVisible(true);

          // 更新弹窗日期为今天
          localStorage.setItem('lastPopupDate', todayString);
        }
        // pushData()
      }
    }).catch((error) => {
      // 處理其他錯誤，例如網絡錯誤等
      // message.error("登入失敗，請檢查帳號密碼是否正確。");
      console.log(error);
    });

    return () => {
      clearInterval(interval); // 清除定时器
    };
  }, [])

  const _history = useHistory();
  const gotoPredict=()=>{
    _history.push(`/PredictPage?coor=${coor}&div=${div}&tr_index=${tr_index ? tr_index : 1}`)
  }
  const handleSearch = () => {
    setDateLoading(true)
    // 在此處執行搜索邏輯，使用 coor、div 和 tr_index 進行搜索
    setIsLoadingTop(true)
    setIsLoadingbottom(true)
    setIsLoadingKnn(true)
    setIsLoadingTen(true)
    setIsLoadingGuart(true)
    getEachTransformer(coor, div?div:"T01", tr_index?tr_index:"1").then((data) => {
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        setIsLoadingTop(false)
        saveEachTransInfo(data)
      }
    })
    getMonthlyRates(coor, div?div:"T01", tr_index?tr_index:"1", 2022).then((data) => {
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        setIsLoadingbottom(false)
        saveMonthlyRates(data)
      }
    })
    getMonthlyKnnRates(coor, div?div:"T01", tr_index?tr_index:"1", 2022).then((data) => {
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        setIsLoadingKnn(false)
        saveMonthlyKnnRates(data)
      }
    })
    getMonthlyTenRates(coor, div?div:"T01", tr_index?tr_index:"1", 2022).then((data) => {
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        setIsLoadingTen(false)
        saveMonthlyTenRates(data)
      }
    })
    getMonthlyGuartRates(coor, div?div:"T01", tr_index?tr_index:"1", 2022).then((data) => {
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        setIsLoadingGuart(false)
        saveMonthlyGuartRates(data)
      }
    })
    getMonthRatesRange(coor, div?div:"T01", tr_index?tr_index:"1", 2022).then((data) => {
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        setDateLoading(false)
        setInterval({
          ...data[0],
          "min_month": 1,
          "min_day": 1,
          "max_month": 12,
          "max_day": 31
        })

      }
    })
  };


  return (

    <Layout class="px-20 wrapper">
      <div class="flex justify-between mt-8">
        <ErrorModal
          setIsErrorModalOpen={setIsErrorModalOpen}
          isErrorModalOpen={isErrorModalOpen}
          errStatus={errorStatus}
        ></ErrorModal>
        <Modal title="變壓器異常通知" open={isModalVisible} onCancel={() => setIsModalVisible(false)}
          footer={[
            // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
            <Button type="primary" onClick={() => setIsModalVisible(false)}>確認</Button>,
          ]}
        >
          {
            isModalDataLoading ? (<>
              <div style={{ height: '200px' }}>
                <Spin tip="載入中" size="large" style={{ height: '200px' }}>
                  <div className="content" />
                </Spin>
              </div> </>) :
              !abnormalTransData ? <>
                無資料
              </>
                :
                (<div style={containerStyle}>
                  <Row style={{ marginBottom: '8px' }} className='font-bold'>
                    <Col span={6}>圖號座標</Col>
                    <Col span={6}>組別</Col>
                    <Col span={6}>第幾具</Col>
                    <Col span={6}>利用率（%）</Col>
                    {/* <Col span={6}>日期</Col> */}
                  </Row>
                  {abnormalTransData?.map((data, index) => (
                    <Row key={index} style={{ borderBottom: '1px solid #f0f0f0', height: '28px' }}>
                      <Col span={6}>{data.coor}</Col>
                      <Col span={6}>{data.div}</Col>
                      {data.power_type == "Y接" ?
                        <Col span={6}>NA</Col>
                        :
                        <Col span={6}>{data.tr_index}</Col>
                      }


                      <Col span={6} style={{ color: '#F66C55' }}>{data.uti_rate.toFixed(1)}</Col>
                      {/* <Col span={6}>{Time[index]}</Col> */}
                    </Row>
                  ))}
                </div>)
          }

          {/* <div class="flex mb-3"><div class=" w-72">
                        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>全選</Checkbox>
                        </div>
                        </div>
                    <div class="flex mb-3">
                        <CheckboxGroup class=" w-72" options={dataCheck} value={checkedList} onChange={onChange} />
                        </div> */}
        </Modal>
        <div>
          <label class="mr-2" htmlFor="coor">圖號座標</label>
          <Input
            id="coor"
            style={{ width: '150px' }}
            placeholder="輸入圖號座標"
            value={coor}
            onChange={(e) => setCoor(e.target.value)}
          />
        </div>
        <div>
          <label class="mr-2" htmlFor="div">組別</label>
          <Input
            id="div"
            style={{ width: '150px' }}
            placeholder="輸入組別"
            value={div}
            onChange={(e) => setDiv(e.target.value)}
          />
        </div>
        <div>
          <label class="mr-2" htmlFor="tr_index">第幾具</label>
          <Input
            id="tr_index"
            style={{ width: '150px' }}
            placeholder="輸入第幾具"
            value={tr_index}
            onChange={(e) => setTrIndex(e.target.value)}
          />
        </div>
        <div class="flex justify-between">
          <Button disabled={!coor||!div||!tr_index} type="primary" onClick={handleSearch}>搜尋</Button>
          <Button disabled={!coor||!div||!tr_index} type="primary" onClick={ gotoPredict } style={{ background: "orange",marginLeft:"10px" }}>負載分割</Button>
        </div>
      </div>
      {isLoadingtop ? (
        <>
          <div style={{ height: '200px' }}>
            <Spin tip="載入中" size="large" style={{ height: '200px' }}>
              <div className="content" />
            </Spin>
          </div>
        </>
      ) : (
        <>
          <Divider />
          <Header class="flex space-x-3 items-center">
            <h2 class="flex-auto font-normal text-base">圖號座標<span class="text-2xl font-bold ml-6">{transformer.eachTransformerInfo.coor?transformer.eachTransformerInfo.coor:""}</span></h2>
            {/* <button class="btn flex-none"><MessageOutlined />推播</button> */}
            {/* <button class="btn btn-orange bg-orange-400 flex" type="primary" onClick={() => { _history.push(`/PredictPage?coor=${parsed.coor}&div=${parsed.div}&tr_index=${parsed.tr_index}`) }}>負載分割</button>
            <button class="btn flex-none" onClick={() => { _history.push(`/tr/search`) }}>返回列表</button> */}
          </Header>

          <Layout class="flex justify-between py-2">
            <Content class="text-base tracking-widest space-y-5 flex-col">
              <div>所轄區處 :<span class="ml-2">{transformer.eachTransformerInfo.addr}</span></div>
              {/* <div>住戶表數 :<span class="ml-2">{transformer.eachTransformerInfo.cust_num} 個（{transformer.eachTransformerInfo.cust_count} 個 AMI）</span></div> */}
              <div>住戶表數 :<span class="ml-2">{transformer.eachTransformerInfo.cust_num} 個</span></div>

              {/* <div>AMI資料完整度 :<span class="ml-2">10 %</span></div> */}
            </Content>
            <Content class="text-base tracking-widest space-y-5 flex-col">
              <div>組別 :<span class="ml-2">{transformer.eachTransformerInfo.div}</span></div>
              <div>容量 :<span class="ml-2">{transformer.eachTransformerInfo.cap} KVA</span></div>
            </Content>
            <Content class="text-base tracking-widest space-y-5 flex-col">
              <div>第幾具 :<span class="ml-2">{transformer.eachTransformerInfo.tr_index}/{transformer.eachTransformerInfo.num}</span></div>

            </Content>

            <Content class="relative flex-col w-40 gap-2" >
              <span class="relative text-base tracking-widest">利用率(%)</span>
              <div class="flex mt-8 w-100 h-100 gap-2">

                <Progress percent={Math.floor(transformer.eachTransformerInfo.uti_rate)} steps={5} size={80} status='active' strokeColor={[green[4], lime[4], yellow[4], orange[4], volcano[5]]} />
              </div>
              {/* <EChartRate /> */}
            </Content>

          </Layout></>)}

      <Divider />


      <Layout>
        <Header class="flex items-center justify-between mb-10">
          {/* <div class="space-x-3 flex-1"></div> */}
          <div class="space-x-3 ">
            <span class="text-base " style={{ fontSize: '14px' }}>期間選擇</span>
            <DatePicker disabled={isdateLoading } defaultValue={moment(currentDate, yearFormat)} disabledDate={disabledDate} format={yearFormat} picker="year" onPanelChange={handlePanelChange} />
          </div>
          {selectedYear ? (<h3 class="font-bold flex-1 m-0 text-base">{selectedYear} 年度 每月用電圖表</h3>) : (<h3 class="font-bold flex-1 m-0 text-base">2022 年度 每月用電圖表</h3>)}
          <div class="flex flex-row ">
            <div class="flex flex-col items-start justify-start">
              <div class="flex flex-row items-center ">
                <span class="mt-2 w-7 h-3 bg-green-500"></span>
                <span class="mt-2 ml-2">純AMI</span>
              </div>
              <div class="flex flex-row items-center justify-end">
                <span class="mt-2 bg-gray-300 w-7 h-3"></span>
                <span class="mt-2 ml-2">預測利用率</span>
              </div>
              <div class="flex flex-row items-center justify-end">
                <span class="mt-2 border-2 border-gray-300 bg-gray-300 w-7 h-0"></span>
                <span class="mt-2 ml-2">預測利用率</span>
              </div>
            </div>
            <div class="flex flex-col ml-2 items-start justify-start">
              <div class="flex flex-row items-center ">
                <span class="mt-2 border-2 border-green-300 w-7 h-0 bg-green-300"></span>
                <span class="mt-2 ml-2 mr-6">KNN&emsp;&emsp;&emsp;&nbsp;</span>
              </div>
              <div class="flex flex-row items-center">
                <span class="mt-2 border-2 border-orange-400 w-7 h-0 bg-orange-400"></span>
                <span class="mt-2 ml-2">十小時率</span>
              </div>
              <div class="flex flex-row items-center">
                <span class="mt-2 border-2 border-black w-7 h-0 bg-black"></span>
                <span class="mt-2 ml-2">保證利用率</span>
              </div>
            </div>
          </div>
        </Header>
        {
          isLoadingbottom||isLoadingKnn||isLoadingTen||isLoadingGuart ? (
            <>
              <Spin tip="圖表載入中" size="large">
                <div className="content" />
              </Spin>
            </>) : (
            <>
              <Content class="flex mb-20 justify-center items-center">
                <span class="min-w-max h-8 -mr-10 transform -rotate-90 text-center">利用率 (%)</span>
                <EChartMonth data={transformer.monthlyRatesList} searchCoor={coor} searchDiv={div} searchTrIndex={tr_index} />
              </Content>
            </>)}
      </Layout>
      {/* <Divider /> */}
    </Layout>
  );

}
const mapStateToProps = ({ transformerReducer }) => ({
  transformer: transformerReducer,
});

const mapDispatchToProps = {
  saveDailyRates, saveQuarterRates, saveMonthlyRates,saveMonthlyKnnRates,saveMonthlyTenRates,saveMonthlyGuartRates, saveEachTransInfo
};
export default connect(mapStateToProps, mapDispatchToProps)(TRNewSearch);