//antd
import { Form, Input, Select, DatePicker, Space  } from 'antd';
import { useEffect, useState } from 'react';
import { saveDailyRates } from '../../actions/transformer'
import moment from 'moment';
import queryString from "query-string";
import { getDailyRates } from '../../api/frontApi'
const { Option } = Select;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 4 },
};



function Industry({ isEdited, user = null }) {
  const parsed = queryString.parse(window.location.search);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const monthFormat = 'YYYY 年 MM 月';
  const currentDate = new Date('2022/6/1');
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
  return (
    <Form {...layout} name="user-edit" colon={false} labelAlign="left">
      <Form.Item name="industry" label="行業別">
        {!isEdited && user ? <span>行業別</span> :
          <Select
            placeholder="選擇行業別"
            allowClear
            size='large'
          >
            <Option value="001">001</Option>
            <Option value="002">002</Option>
          </Select>}
      </Form.Item>
      <Form.Item name="time" label="時間選擇">
        <Space direction="vertical" size={12}>
          <DatePicker defaultValue={moment(currentDate, monthFormat)} format={monthFormat} picker="month" onPanelChange={handlePanelChange_daily}/>
        </Space>
      </Form.Item>
      <Form.Item name="info" label="資料形式">
        {!isEdited && user ? <span>平均用電量</span> :
          <Select
            placeholder="選擇資料形式"
            allowClear
            size='large'
          >
            <Option value="平均用電量">平均用電量</Option>
            <Option value="尖峰用電量">尖峰用電量</Option>
          </Select>}
      </Form.Item>
    
    </Form>
  );

}
export default Industry;
