//antd
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 4 },
};

function UserForm({ isEdited, user = null, onFormChange }) {
  const handleChange = (changedValues) => {
    console.log('Changed values:', changedValues);
    onFormChange(changedValues);
  };
  return (
    <Form {...layout} name="user-edit" colon={false} labelAlign="left" onValuesChange={handleChange}>
      <Form.Item name="name" label="帳號名稱">
        {!isEdited && user ? <span>{user.name}</span> : <Input placeholder={ user ? user.name : "請輸入帳號名稱"} size="middle" />}
      </Form.Item>
      <Form.Item name="email" label="信箱">
        {!isEdited && user ? <span>{user.email}</span> : <Input placeholder={ user ? user.email : "請輸入信箱"} size="middle" />}
      </Form.Item>
      <Form.Item name="group" label="身份權限">
        {!isEdited && user ? <span>{user.group.join(' / ')}</span> :
          <Select
            mode="tags"
            placeholder="請選擇身份"
            defaultValue={user ? user.group : []}
            allowClear
            size='middle'
          >
            <Option value="總處管理員">總處管理員</Option>
            <Option value="總處操作員">總處操作員</Option>
            <Option value="區處管理員">區處管理員</Option>
            <Option value="區處操作員">區處操作員</Option>
          </Select>}
      </Form.Item>
      <Form.Item name="district" label="負責區處">
        {!isEdited && user ? <span>{user.district}</span>:
          <Select
            placeholder="選擇區處"
            allowClear
            size='middle'
            defaultValue={user ? user.district : []}

          >
            <Option value="台北市區">台北市區</Option>
            <Option value="台中市區">台中市區</Option>
          </Select>}
      </Form.Item>
      {/* <Form.Item name="notifygroup" label="通知群組">
        {!isEdited && user ? <span>{user.notifygroup}</span>:
          <Select
            placeholder="選擇群組"
            allowClear
            size='middle'
            defaultValue={user ? user.notifygroup : []}
          >
            <Option value="群組一">群組一</Option>
            <Option value="群組二">群組二</Option>
          </Select>}
      </Form.Item> */}
      <Form.Item name="line_push" label="Line 帳號推播">
        {!isEdited && user ? <span>{user.line_push}</span> :
          <Select
            placeholder="是否連接Line帳號"
            allowClear
            size='middle'
            defaultValue={user ? user.line_push : []}
          >
            <Option value="已連接">已連接</Option>
            <Option value="未連接">未連接</Option>
          </Select>}
      </Form.Item>
      <Form.Item name="email_push" label="電子信箱推播">
        {!isEdited && user ? <span>{user.email_push}</span>  :
          <Select
            placeholder="是否連結電子信箱帳號"
            allowClear
            size='middle'
            defaultValue={user ? user.email_push : []}
          >
            <Option value="已連接">已連接</Option>
            <Option value="未連接">未連接</Option>
          </Select>}
      </Form.Item>
    </Form>
  );

}
export default UserForm;
