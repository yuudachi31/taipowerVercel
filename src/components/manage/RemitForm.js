//antd
import { Form, Input, Select, DatePicker, Space  } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;
const region_list=[
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

function UserInfo({ setSelectedDate,setSelectedRegion,setDownloading,isEdited, user = null }) {

  const dayFormat = 'YYYYMMDD';
  const handledayChange = (value,mode) => {
    
    // setSelectedDay(mode);
    // let selectedDate = mode.split(" ")
    setSelectedDate(mode)
    console.log(mode)
    // setSelectedYear(selectedDate[0])
    // setSelectedMonth(selectedDate[2])
    // setSelectedDay(selectedDate[4])

  };
  const handleGroupChange = (value) => {
    // console.log("aa")
    // const selectedGroup = region_list.find((group) => group.region_name === value);
    setSelectedRegion(value);
    setDownloading(false)
    // console.log(value)
};
  return (
    <Form name="user-edit" colon={false} labelAlign="left">
      <Form.Item name="district">
        <Space direction="horizontal">
          <span className='text-normal font-bold'>時間選擇：</span> 
          <RangePicker className='text-normal'format={dayFormat} onChange={handledayChange}/>
        </Space>
      </Form.Item>
      <Form.Item name="district">
        <Space direction="horizontal">
          <span className='text-normal font-bold'>區處：</span> 
          <Select
            placeholder="選擇區處"
            allowClear
            onChange={handleGroupChange}
            style={{ fontSize:'16px', width:'200px'}}
            // size='large'
          >
            {
              region_list.map((el,index)=>(
                <Option value={el.region_id}>{el.region_name}</Option>
              ))
            }
          </Select>
        </Space>
      </Form.Item>
    </Form>
  );

}
export default UserInfo;
