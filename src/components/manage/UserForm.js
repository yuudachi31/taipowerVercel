//antd
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 4 },
};

function UserInfo({ isEdited, user = null }) {
  return (
    <Form {...layout} name="user-edit" colon={false} labelAlign="left">
      <Form.Item name="username" label="帳號名稱">
        {!isEdited && user ? <span>{user.name}</span> : <Input placeholder={ user ? user.name : "請輸入帳號名稱"} size='middle' />}
      </Form.Item>
      <Form.Item name="email" label="信箱">
        {!isEdited && user ? <span>{user.email}</span> : <Input placeholder={ user ? user.email : "請輸入信箱"} size='middle' />}
      </Form.Item>
      {/* <Form.Item name="password" label="密碼">
        {!isEdited && user ? <span>{user.password}</span> : <Input placeholder={ user ? user.email : "請輸入密碼"} size='middle' />}
      </Form.Item> */}
      <Form.Item name="group" label="身份權限">
        {!isEdited && user ? <span>{user.group.join(' / ')}</span> :
          <Select
            mode="tags"
            placeholder="請選擇身份"
            defaultValue={user ? user.group : []}
            allowClear
            size='middle'
          >
            <Option value="運維人員">運維人員</Option>
            <Option value="區處檢修人員">區處檢修人員</Option>
            <Option value="區處管理者">區處管理者</Option>
          </Select>}
      </Form.Item>
      <Form.Item name="district" label="負責區域">
        {!isEdited && user ? <span>台北</span> :
          <Select
            placeholder="選擇區域"
            allowClear
            size='middle'
          >
            <Option value="台北">台北</Option>
            <Option value="台中">台中</Option>
          </Select>}
      </Form.Item>
      <Form.Item name="notify-group" label="通知群組">
        {!isEdited && user ? <span>群組一</span> :
          <Select
            placeholder="選擇群組"
            allowClear
            size='middle'
          >
            <Option value="群組一">群組一</Option>
            <Option value="群組二">群組二</Option>
          </Select>}
      </Form.Item>
      <Form.Item name="line" label="Line 帳號推播">
        {!isEdited && user ? <span>未連接</span> :
          <Select
            placeholder="是否連接Line帳號"
            allowClear
            size='middle'
          >
            <Option value="已連接">已連接</Option>
            <Option value="未連接">未連接</Option>
          </Select>}
      </Form.Item>
      <Form.Item name="emial" label="電子信箱推播">
        {!isEdited && user ? <span>未連接</span> :
          <Select
            placeholder="是否連結電子信箱帳號"
            allowClear
            size='middle'
          >
            <Option value="已連接">已連接</Option>
            <Option value="未連接">未連接</Option>
          </Select>}
      </Form.Item>
    </Form>
  );

}
export default UserInfo;
