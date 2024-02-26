//antd
import { Form, Input, Select, DatePicker, Space  } from 'antd';
import moment from 'moment';
const { Option } = Select;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 4 },
};
const monthFormat = 'YYYY 年 MM 月';
const currentDate = new Date('2022/6/1');
const handlePanelChange_daily =(value,mode)=>{

}
function Industry({ isEdited, user = null }) {
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
      {/* <Form.Item name="district" label="群組">
        {!isEdited && user ? <span>台北</span> :
          <Select
            placeholder="選擇群組"
            allowClear
            size='large'
          >
            <Option value="群組一">群組一</Option>
            <Option value="群組二">群組二</Option>
          </Select>}
      </Form.Item>
      <Form.Item name="notify-group" label="第幾具">
        {!isEdited && user ? <span>群組一</span> :
          <Select
            placeholder="選擇第幾具"
            allowClear
            size='large'
          >
            <Option value="第一具">第一具</Option>
            <Option value="第二具">第二具</Option>
          </Select>}
      </Form.Item> */}
    </Form>
  );

}
export default Industry;
