//antd
import { Divider, Layout } from 'antd';
import { useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

import UserForm from '../../components/manage/UserForm'

const { Header, Footer, Content } = Layout;


function CreateUser() {
  const _history = useHistory()

  const handleClickCreate = () => {
    _history.push('/manage/user/0')
  }

  const handleClickCancel = () => {
    _history.push('/manage/user')
  }

  return (
    <Layout class="h-screen px-20 py-12 manage-wrapper bg-gray-100">
      <Header class="pt-4 pb-8 grid grid-flow-col auto-cols-max items-center gap-x-7">
        <a onClick={(e) => { e.preventDefault(); _history.push('/manage/user'); }} class="row-span-2">
          <LeftOutlined style={{ fontSize: '24px', color: '#7B7B7B' }} />
        </a>
        <h2 class="font-bold text-xl mb-0">新增帳號</h2>
      </Header>
      <Content class="h-08 bg-white">
        <Content class="h-08 px-14 py-12">
          <UserForm isEdited={false} user={null} />
        </Content>
        <Divider />
        <Footer class="grid grid-cols-2 px-7">
          <button class="btn-manage justify-self-start mr-4" onClick={handleClickCancel}>取消</button>
          <button class="btn-manage btn-manage-full justify-self-end mr-4" onClick={handleClickCreate}>上傳</button>
        </Footer>
      </Content>
    </Layout>
  );

}
export default CreateUser;
