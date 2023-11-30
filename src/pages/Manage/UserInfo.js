
//antd
import { Divider, Layout } from 'antd';

import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

import { USER_DATA } from './UserList';
import UserForm from '../../components/manage/UserForm'

const { Header, Footer, Content } = Layout;


function UserInfo() {
  const _history = useHistory()
  const { user_id: userId } = useParams()
  const [isEdited, setIsEdited] = useState(false)
  const [user, setUser] = useState(USER_DATA[userId])


  useEffect(() => {
    setUser(USER_DATA[userId]);
  }, [userId]); 

  const handleFormChange = (changedValues) => {
    setUser((prevUser) => ({ ...prevUser, ...changedValues }));
  };
  const handleSave = () => {
    console.log('Before save:', USER_DATA[userId]);
    USER_DATA[userId] = user;
    setIsEdited(false);
    console.log('After save:', USER_DATA[userId]);
  };
  // const handleClickStore = () => {
  //   setIsEdited(false)
  // }

  const handleClickCancel = () => {
    setUser(USER_DATA[userId]);
    setIsEdited(false);
  };

  const handleClickEdit = () => {
    setIsEdited(true)
  }
 

  return (
    <Layout class="h-screen px-20 py-12 manage-wrapper bg-gray-100">
      <Header class="pt-4 pb-8 grid grid-rows-2 auto-cols-min items-center gap-x-7">
        <a onClick={(e) => { e.preventDefault(); _history.push('/manage/user'); }} class="row-span-2"><LeftOutlined style={{ fontSize: '24px', color: '#7B7B7B' }} /></a>
          <span class="text-base text-gray-400 col-start-2 whitespace-nowrap overflow-hidden">帳號名稱</span>
          <h2 class="flex-auto font-bold text-xl col-start-2">{user.name}</h2>
      </Header>
      <Content class="h-08 bg-white">
          <Content class="h-08 px-14 py-12">
            <UserForm isEdited={isEdited} user={user} onFormChange={handleFormChange} />
          </Content>
          <Divider />
          <Footer class="grid grid-cols-2 px-7">
            {
              !isEdited ?
                <button class="btn-manage btn-manage-full justify-self-end col-span-2 mr-4" onClick={handleClickEdit}>編輯</button>
                :
                <>
                  <button class="btn-manage justify-self-start mr-4" onClick={handleClickCancel}>取消</button>
                  <button class="btn-manage btn-manage-full justify-self-end mr-4"  onClick={handleSave}>儲存</button>
                </>
            }
          </Footer>
      </Content>
    </Layout>
  );

}
export default UserInfo;
