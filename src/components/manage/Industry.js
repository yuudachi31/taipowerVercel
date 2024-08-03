//antd
import { Form, Input, Select, DatePicker, Space  } from 'antd';
import { useEffect, useState } from 'react';
import { saveDailyRates } from '../../actions/transformer'
import moment from 'moment';
import queryString from "query-string";
import { getDailyRates } from '../../api/frontApi'
const { Option } = Select;
const { RangePicker } = DatePicker;

const region_list = [
  {
      "region_id": "00",
      "region_name": "台北市區營業處"
  },
  {
      "region_id": "01",
      "region_name": "台北南區營業處"
  },
  {
      "region_id": "02",
      "region_name": "基隆區營業處"
  },
  {
      "region_id": "03",
      "region_name": "宜蘭區營業處"
  },
  {
      "region_id": "04",
      "region_name": "桃園區營業處"
  },
  {
      "region_id": "05",
      "region_name": "台北西區營業處"
  },
  {
      "region_id": "06",
      "region_name": "新竹區營業處"
  },
  {
      "region_id": "07",
      "region_name": "台中區營業處"
  },
  {
      "region_id": "08",
      "region_name": "彰化區營業處"
  },
  {
      "region_id": "09",
      "region_name": "嘉義區營業處"
  },
  {
      "region_id": "10",
      "region_name": "台南區營業處"
  },
  {
      "region_id": "11",
      "region_name": "高雄區營業處"
  },
  {
      "region_id": "12",
      "region_name": "屏東區營業處"
  },
  {
      "region_id": "13",
      "region_name": "花蓮區營業處"
  },
  {
      "region_id": "14",
      "region_name": "台東區營業處"
  },
  {
      "region_id": "15",
      "region_name": "澎湖區營業處"
  },
  {
      "region_id": "16",
      "region_name": "台北北區營業處"
  },
  {
      "region_id": "17",
      "region_name": "南投區營業處"
  },
  {
      "region_id": "18",
      "region_name": "鳳山區營業處"
  },
  {
      "region_id": "19",
      "region_name": "雲林區營業處"
  },
  {
      "region_id": "20",
      "region_name": "新營區營業處"
  },
  {
      "region_id": "21",
      "region_name": "苗栗區營業處"
  },
  {
      "region_id": "22",
      "region_name": "金門區營業處"
  },
  {
      "region_id": "23",
      "region_name": "馬祖區營業處"
  }
]

function Industry({setSelectedDate,setSelectedRegion}) {
  const parsed = queryString.parse(window.location.search);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const monthFormat = 'YYYY-MM';
  const currentDate = new Date('2022/6/1');
  const handlePanelChange_daily =(value,mode)=>{
    const parsed = queryString.parse(window.location.search);
    // setSelectedYear(value.year());
    if (mode === 'month') {
      // setSelectedYear(value.year());
      // setSelectedMonth(value.month());
    // const parsed = queryString.parse(window.location.search);
      // console.log(value.value)
      // setSelectedDate(mode)
    }
    setSelectedDate(mode)
    // console.log(mode)
    // console.log(mode)

  }
  const handleGroupChange = (value) => {
    // console.log("aa")
    // const selectedGroup = groupData.find((group) => group.value === value);
    // setSelectedGroup(selectedGroup);
  setSelectedRegion(value)
    console.log(value)
  };
  
  return (
    <Form name="user-edit" colon={false} labelAlign="left">
      {/* <Form.Item name="industry">
        <Space direction="horizontal">
          <span className='text-normal font-bold'>區處：</span> 
          <Select
            placeholder="選擇區處"
            allowClear
            style={{ fontSize:'16px', width:'200px'}}
            // size='large'
          >
            <Option value="001">001</Option>
            <Option value="002">002</Option>
          </Select>
        </Space>
      </Form.Item> */}
      <Form.Item name="time">
        <Space direction="horizontal">
          <span className='text-normal font-bold'>時間選擇：</span> 
          <DatePicker placeholder="選擇月份"  format={monthFormat} picker="month" onChange={handlePanelChange_daily}/>
        </Space>
      </Form.Item>
      {/* <Form.Item name="info">
        <Space direction="horizontal">
          <span className='text-normal font-bold'>資料形式：</span> 
          <Select
            placeholder="選擇資料形式"
            allowClear
            style={{ fontSize:'16px', width:'200px'}}
            // size='large'
          >
            <Option value="平均用電量">平均用電量</Option>
            <Option value="尖峰用電量">尖峰用電量</Option>
          </Select>
        </Space>
      </Form.Item> */}
      <Form.Item name="info">
        <Space direction="horizontal">
          <span className='text-normal font-bold'>選擇區處：</span> 
          <Select
                            showSearch
                            placeholder="選擇區處"
                            optionFilterProp="children"
                            style={{ width: 200, fontSize: '16px' }}
                            onChange={handleGroupChange}
                            // onSearch={onSearch}
                            filterOption={(input, option) =>
                                (option?.area ?? '').includes(input)
                            }
                        >
                            {region_list.map((group) => (
                                <Option key={group.region_id} value={group.region_id}  class='select-search-input'>
                                    {group.region_name}
                                </Option>
                            ))}
                        </Select>
        </Space>
      </Form.Item>
    
    </Form>
  );

}
export default Industry;
