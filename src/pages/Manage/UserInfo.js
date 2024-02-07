
//antd
import { Divider, Layout } from 'antd';

import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { saveUserListApi, saveUserListEdit } from '../../actions/userManage'
import { connect } from 'react-redux';
import { USER_DATA } from './UserList';
import { postAccountUpload, getRegionUser, patchUserInfo, patchRole } from '../../api/frontApi';
import UserForm from '../../components/manage/UserForm'
const accountUserID = document.cookie?.split("; ").find((row) => row.startsWith("user_id"))?.split("=")[1]
const { Header, Footer, Content } = Layout;


function UserInfo({ userManage, saveUserListApi, saveUserListEdit }) {
  const _history = useHistory()
  const { user_id: userId } = useParams()
  const [isEdited, setIsEdited] = useState(false)
  const [isLoading, setIsloading] = useState(true)
  const [user, setUser] = useState({
    user_id: "",
    name: ' ',
    group: [{
      role_chi: "",
      role_code: ""
    }],
    email: 'aaa123@gmail.com',
    // password: '11111111',
    district: ['台北市區'],
    lock: ['解鎖'],
  })
  console.log(userManage.userList)
  useEffect(() => {
    getRegionUser(document.cookie.split(";").filter((value) => value.match("region_id"))[0].split('=')[1]).then((data) => {
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        saveUserListApi(data)
        // console.log(data)
        console.log(userManage)
        setIsloading(false)
        // console.log(data.find((el)=>el.user_id=userId))
        setUser(userManage.userList.find((el) => el.user_id == userId));
      }
    })
  }, []);
  useEffect(() => {
    // setUser(userManage.userList.find((el)=>el.user_id=userId));
  }, [userId]);

  const handleFormChange = (changedValues) => {
    /////////如果form的身分權限不是用tag 要加if的寫法
    if (changedValues.group) {
      // console.log()
      setUser((prevUser) => ({
        ...prevUser, ...{
          group: [changedValues.group]
        }
      }));
      console.log(user)
      /////////////////////////
    } else {
      setUser((prevUser) => ({ ...prevUser, ...changedValues }));
    }

  };
  const handleSave = () => {
    setIsloading(true)
    // console.log('Before save:', userManage.userList[userId]);
    // USER_DATA[userId] = user;
    // console.log(user)
    setIsEdited(false);
    saveUserListEdit(user)
    //後臺會比對user_id的權限來看能不能改別人的帳號'
    patchUserInfo(
      {
        "user_id": accountUserID,
        "user_name": user.name,
        "email": user.email,
        "region_id": user.region_id,
        "chat_id": user.chat_id
      }
    ).then(() => {
      console.log(user)
      function switchRoleName(role) {
        switch (role) {
          case "區處管理員":
            return "adm"
          case "運維":
            return "ops"
          case "檢修":
            return "ove"
          default:
            return "0"
        }
      }
      console.log(switchRoleName(user.group[0]))


      //  switchRoleName(user.group[0])
      patchRole(switchRoleName(user.group[0]), accountUserID).then(() => {
        setIsloading(false)
      })
    })



    // console.log('After save:', userManage.userList[userId]);
  };
  // const handleClickStore = () => {
  //   setIsEdited(false)
  // }

  const handleClickCancel = () => {
    setUser(userManage.userList.find((el) => el.user_id == userId));
    setIsEdited(false);
  };

  const handleClickEdit = () => {
    setIsEdited(true)
    setUser(userManage.userList.find((el) => el.user_id == userId));

  }


  return (
    <Layout class="h-screen px-20 py-12 manage-wrapper bg-gray-100">
      <Header class="pt-4 pb-8 grid grid-rows-2 auto-cols-min items-center gap-x-7">
        <a onClick={(e) => { e.preventDefault(); _history.push('/manage/user'); }} class="row-span-2"><LeftOutlined style={{ fontSize: '24px', color: '#7B7B7B' }} /></a>
        <span class="text-base text-gray-400 col-start-2 whitespace-nowrap overflow-hidden">帳號名稱</span>
        <h2 class="flex-auto font-bold text-xl col-start-2">{userManage.userList.find((el) => el.user_id == userId)?.name}</h2>
      </Header>
      <Content class="h-08 bg-white">
        <Content class="h-08 px-14 py-12">
          <UserForm isEdited={isEdited} user={userManage.userList.find((el) => el.user_id == userId)} onFormChange={handleFormChange} />
        </Content>
        <Divider />
        <Footer class="grid grid-cols-2 px-7">
          {
            !isEdited ?
              <button class={isLoading ? "btn-manage btn-manage-full  justify-self-end col-span-2 mr-4 bg-not-active" : "btn-manage btn-manage-full  justify-self-end col-span-2 mr-4"} disabled={isLoading} onClick={handleClickEdit}>編輯</button>
              :
              <>
                <button class="btn-manage justify-self-start mr-4" onClick={handleClickCancel}>取消</button>
                <button class="btn-manage btn-manage-full justify-self-end mr-4" onClick={handleSave}>儲存</button>
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
  saveUserListApi, saveUserListEdit
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

