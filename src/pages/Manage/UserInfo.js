
//antd
import { Divider, Layout } from 'antd';

import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import{saveUserList} from '../../actions/userManage'
import { connect } from 'react-redux';
import { USER_DATA } from './UserList';
import { postAccountUpload,getRegionUser } from '../../api/frontApi';
import UserForm from '../../components/manage/UserForm'

const { Header, Footer, Content } = Layout;


function UserInfo({userManage,saveUserList}) {
  const _history = useHistory()
  const { user_id: userId } = useParams()
  const [isEdited, setIsEdited] = useState(false)
  const [user, setUser] = useState({
    user_id: 0,
    name: 'User_001',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com',
    // password: '11111111',
    district: ['台北市區'],
    lock:['解鎖'],
  })
console.log(userManage.userList)
  useEffect(() => {
    getRegionUser("01").then((data)=>{
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        saveUserList(data)
        // console.log(data)
        console.log(userManage)
        // console.log(data.find((el)=>el.user_id=userId))
        setUser(userManage.userList.find((el)=>el.user_id=userId));
      }
    }) 
  }, []); 
  useEffect(() => {
    // setUser(userManage.userList.find((el)=>el.user_id=userId));
  }, [userId]); 

  const handleFormChange = (changedValues) => {
    setUser((prevUser) => ({ ...prevUser, ...changedValues }));
  };
  const handleSave = () => {
    // console.log('Before save:', userManage.userList[userId]);
    USER_DATA[userId] = user;
    setIsEdited(false);
    // console.log('After save:', userManage.userList[userId]);
  };
  // const handleClickStore = () => {
  //   setIsEdited(false)
  // }

  const handleClickCancel = () => {
    setUser(userManage.userList.find((el)=>el.user_id=userId));
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
          <h2 class="flex-auto font-bold text-xl col-start-2">{userManage.userList.find((el)=>el.user_id=userId).name}</h2>
      </Header>
      <Content class="h-08 bg-white">
          <Content class="h-08 px-14 py-12">
            <UserForm isEdited={isEdited} user={userManage.userList.find((el)=>el.user_id=userId)} onFormChange={handleFormChange} />
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
const mapStateToProps = ({ userManageReducer }) => ({
  userManage: userManageReducer,
});

const mapDispatchToProps = {
  saveUserList
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

