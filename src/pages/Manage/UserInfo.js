
//antd
import { Divider, Layout } from 'antd';

import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { saveUserListApi, saveUserListEdit } from '../../actions/userManage'
import { storeUserInfo } from '../../actions/frontAction'
import { connect } from 'react-redux';
import { USER_DATA } from './UserList';
import { postAccountUpload, getRegionUser, patchUserInfo, patchRole, getUserRole, getAllUser } from '../../api/frontApi';
import UserForm from '../../components/manage/UserForm'
const accountUserID = document.cookie?.split("; ").find((row) => row.startsWith("user_id"))?.split("=")[1]
const glabalToken = document.cookie?.split("; ").find((row) => row.startsWith("fltk"))?.split("=")[1]
let userRole = null
if(document.cookie?.split("; ").find((row) => row.startsWith("roles"))?.split("=")[1]!=undefined){
   userRole = JSON.parse(document.cookie?.split("; ").find((row) => row.startsWith("roles"))?.split("=")[1])[0].role_name

}
const { Header, Footer, Content } = Layout;

const region_list = [
  {
    "region_id": "00",
    "region_name": "台北市區營業處"
  },
  {
    "region_id": "01",
    "region_name": "台北南區營業處"
  },
  {
    "region_id": "02",
    "region_name": "基隆區營業處"
  },
  {
    "region_id": "03",
    "region_name": "宜蘭區營業處"
  },
  {
    "region_id": "04",
    "region_name": "桃園區營業處"
  },
  {
    "region_id": "05",
    "region_name": "台北西區營業處"
  },
  {
    "region_id": "06",
    "region_name": "新竹區營業處"
  },
  {
    "region_id": "07",
    "region_name": "台中區營業處"
  },
  {
    "region_id": "08",
    "region_name": "彰化區營業處"
  },
  {
    "region_id": "09",
    "region_name": "嘉義區營業處"
  },
  {
    "region_id": "10",
    "region_name": "台南區營業處"
  },
  {
    "region_id": "11",
    "region_name": "高雄區營業處"
  },
  {
    "region_id": "12",
    "region_name": "屏東區營業處"
  },
  {
    "region_id": "13",
    "region_name": "花蓮區營業處"
  },
  {
    "region_id": "14",
    "region_name": "台東區營業處"
  },
  {
    "region_id": "15",
    "region_name": "澎湖區營業處"
  },
  {
    "region_id": "16",
    "region_name": "台北北區營業處"
  },
  {
    "region_id": "17",
    "region_name": "南投區營業處"
  },
  {
    "region_id": "18",
    "region_name": "鳳山區營業處"
  },
  {
    "region_id": "19",
    "region_name": "雲林區營業處"
  },
  {
    "region_id": "20",
    "region_name": "新營區營業處"
  },
  {
    "region_id": "21",
    "region_name": "苗栗區營業處"
  },
  {
    "region_id": "22",
    "region_name": "金門區營業處"
  },
  {
    "region_id": "23",
    "region_name": "馬祖區營業處"
  }
]
function UserInfo({ userManage, saveUserListApi, saveUserListEdit, storeUserInfo }) {
  const _history = useHistory()
  const { user_id: userId } = useParams()
  const [isEdited, setIsEdited] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
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
    if (userRole != 'usr' && userRole != 'ove') {
      getAllUser().then((data) => {
        // getAllUser().then((data)=>{})
        // getRegionUser(document.cookie.split(";").filter((value) => value.match("region_id"))[0].split('=')[1]).then((data)=>{
        if (data.errStatus) {
          console.log(data.errDetail);
        } else {
          saveUserListApi(data)
          setIsLoading(false)
          console.log(userManage)
        }
      })
    } else {
      getRegionUser(document.cookie.split(";").filter((value) => value.match("region_id"))[0].split('=')[1]).then((data) => {
        if (data.errStatus) {
          console.log(data.errDetail);
        } else {
          saveUserListApi(data)
          setIsLoading(false)
          console.log(userManage)
        }
      })
    }
  }, []);
  useEffect(() => {
    // setUser(userManage.userList.find((el)=>el.user_id=userId));
  }, [userId]);

  const handleFormChange = (changedValues) => {
    /////////如果form的身分權限不是用tag 要加if的寫法
    let groupValue = []
    console.log(changedValues.group)
    groupValue.push(changedValues.group)
    // console.log(groupValue)
    setUser((prevUser) => ({ ...prevUser, ...changedValues }));
    if (changedValues.group) {
      // console.log()
      setUser((prevUser) => ({
        ...prevUser, 
          group: [changedValues.group],
        
      }));
      console.log(user.group)
      /////////////////////////
    } if (changedValues.district2) {
      setUser((prevUser) => ({
        ...prevUser, ...{
          district2: { region_id: [changedValues.district2], region_name: [region_list.find((el) => el.region_id == changedValues.district2).region_name] }
        }
      }));
    } 
      // console.log("apple")
      
    
    console.log(user)
  };
  const handleSave = () => {
    setIsLoading(true)
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
        "region_id": user.district2.region_id[0],
        "chat_id": user.chat_id
      }
    ).then(() => {
      console.log(user)
      function switchRoleName(role) {
        switch (role) {
          case "總處管理員":
            return "adm"
          case "總處操作員":
            return "ops"
          case "區處管理員":
            return "ove"
          case "區處操作員":
            return "usr"
          default:
            return "0"
        }
      }
      console.log(user.group ,switchRoleName(user.group[0]))


      //  switchRoleName(user.group[0])
      patchRole(switchRoleName(user.group[0]), accountUserID).then(() => {
        getUserRole(glabalToken).then((userData) => {

          document.cookie = "user_id=" + userData.user_id + ";path=/";
          document.cookie = "email=" + userData.email + ";path=/";
          document.cookie = "chat_id=" + userData.chat_id + ";path=/";
          document.cookie = "user_name=" + userData.user_name + ";path=/";
          document.cookie = "region_id=" + userData.region_id + ";path=/";
          document.cookie = "region_name=" + userData.region_name + ";path=/";
          document.cookie = "roles=" + JSON.stringify(userData.roles) + ";path=/";
          storeUserInfo(userData);
          // console.log(userData);
          // console.log(document.cookie);
          setIsLoading(false)
          // _history.push("/tr/search");
          // console.log("3")
        });

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
    console.log(userManage.userList)

  }


  return (
    <Layout class="h-screen px-20 py-12 manage-wrapper bg-gray-100">
      <Header class="pt-4 pb-8 grid grid-rows-2 auto-cols-max items-center gap-x-7">
        <a onClick={(e) => { e.preventDefault(); _history.push('/manage/user'); }} class="row-span-2"><LeftOutlined style={{ fontSize: '24px', color: '#7B7B7B' }} /></a>
        <span class="text-base text-gray-400 col-start-2 whitespace-nowrap overflow-hidden">帳號名稱</span>
        <h2 class="flex-auto font-bold text-xl col-start-2">{userManage.userList.find((el) => el.user_id == userId)?.name}</h2>
      </Header>
      <Content class="h-08 bg-white">
        <Content class="h-08 px-14 py-12">
          <UserForm isLoading={isLoading} setIsloading={setIsLoading} isEdited={isEdited} user={userManage.userList.find((el) => el.user_id == userId)} onFormChange={handleFormChange} />
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
  saveUserListApi, saveUserListEdit, storeUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

