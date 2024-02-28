//antd
import { Form, Input, Select, DatePicker, Space  } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;


function UserInfo({ isEdited, user = null }) {
  return (
    <Form name="user-edit" colon={false} labelAlign="left">
      <Form.Item name="district">
        <Space direction="horizontal">
          <span className='text-normal font-bold'>時間選擇：</span> 
          <RangePicker className='text-normal' picker="year" />
        </Space>
      </Form.Item>
      <Form.Item name="district">
        <Space direction="horizontal">
          <span className='text-normal font-bold'>區處：</span> 
          <Select
            placeholder="選擇區處"
            allowClear
            style={{ fontSize:'16px', width:'200px'}}
            // size='large'
          >
            <Option value="台北">台北</Option>
            <Option value="台中">台中</Option>
          </Select>
        </Space>
      </Form.Item>
    </Form>
  );

}
export default UserInfo;
