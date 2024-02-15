//antd
import { Form, Input, Select, DatePicker, Space  } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 4 },
};

function UserInfo({ isEdited, user = null }) {
  return (
    <Form {...layout} name="user-edit" colon={false} labelAlign="left">
      <Form.Item name="district" label="時間選擇">
        <Space direction="vertical" size={12}>
          <RangePicker picker="year" />
        </Space>
      </Form.Item>
      <Form.Item name="district" label="區處">
        {!isEdited && user ? <span>台北</span> :
          <Select
            placeholder="選擇區處"
            allowClear
            size='large'
          >
            <Option value="台北">台北</Option>
            <Option value="台中">台中</Option>
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
export default UserInfo;
