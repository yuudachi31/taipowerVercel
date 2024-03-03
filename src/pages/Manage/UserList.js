//帳號管理
//antd
import { message, Layout, Input, Table ,Spin} from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useState } from 'react';
import { Pagination } from 'antd';
import { useHistory } from 'react-router-dom';
import { postAccountUpload,getRegionUser,getAccountForDownload} from '../../api/frontApi';
import{saveUserListApi,saveUserListEdit} from '../../actions/userManage'
import { connect } from 'react-redux';
import { useEffect } from 'react';
const { Header, Content } = Layout;
const { Search } = Input


export const USER_DATA = [
  {
    user_id: 0,
    name: 'User_001',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com',
    // password: '11111111',
    district: ['台北市區'],
    lock:['解鎖'],


  },
  {
    user_id: 1,
    name: 'User_002',
    group: ['區處操作員'],
    email: 'aaa123@gmail.com',
    district: ['台北市區'],
    lock:['解鎖'],
  },
  {
    user_id: 2,
    name: 'User_003',
    group: ['區處管理員'],
    email: 'aaa123@gmail.com',
    district: ['台北市區'],
    lock:['解鎖'],
  },
  {
    user_id: 3,
    name: 'User_004',
    group: ['區處管理員'],
    email: 'aaa123@gmail.com',
    district: ['台北市區'],
    lock:['解鎖'],
  },
  {
    user_id: 4,
    name: 'User_005',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com',
    district: ['台北市區'],
    lock:['解鎖'],
  },
  {
    user_id: 5,
    name: 'User_006',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com',
    district: ['台北市區'],
    lock:['解鎖'],
  },
  {
    user_id: 6,
    name: 'User_007',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com',
    district: ['台北市區'],
    lock:['解鎖'],
  },
  {
    user_id: 7,
    name: 'User_008',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com',
    district: ['台北市區'],
    lock:['解鎖'],
  },
  {
    user_id: 8,
    name: 'User_009',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com',
    district: ['台北市區'],
    lock:['解鎖'],
  },
  {
    user_id: 9,
    name: 'User_010',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com',
    district: ['台北市區'],
    lock:['解鎖'],
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};



function UserList({userManage,saveUserListApi,saveUserListEdit}) {
  const _history = useHistory()
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true)
    //當切換成不同群組時將列表切回第一頁
  const [currentPage, setCurrentPage] = useState(1);
  const[downloading,setDownloading]=useState(false)
  const handlePaginationChange = (page) => {
      setCurrentPage(page);
  };
  useEffect(()=>{
  
    console.log(document.cookie.split(";").filter((value) => value.match("region_id"))[0].split('=')[1])
    getRegionUser(document.cookie.split(";").filter((value) => value.match("region_id"))[0].split('=')[1]).then((data)=>{
      if (data.errStatus) {
        console.log(data.errDetail);
      } else {
        saveUserListApi(data)
        // console.log(data)
        setIsLoading(false)
        console.log(userManage)
      }
    })
  },[])

  //更新利用率loading
  const importSuccess = () => {
    message.loading('正在匯入中...', 3, () => {
      message.success('已更新！');
    });
  };
const handleDownLoadAccountList =()=>{
  setDownloading(true)
  getAccountForDownload().then((data)=>{

    //以下為轉成ANSI編碼的寫法 但失敗了
    // console.log(data)
    // const encodedData = new TextEncoder().encode(data);
    // const blob = new Blob([encodedData], {
      // type: 'text/csv;charset=utf-8;'
    //   type: '  text/csv;charset=windows-1252;'
    // });

   
    const blob = new Blob([data], {
      type: 'text/csv;charset=utf-8;'
    });

    const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'account.csv';
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
  setDownloading(false)
  })
}
  // const onClick = ({ key }) => {
  //   console.log("aa")
  // };
  const handleFileUpload = () => {
    let file = document.querySelector("[name=file]").files[0];
      let formData = new FormData();
    //https://stackoverflow.com/questions/62888805/how-can-i-pass-my-csv-file-as-form-data-using-rest-api
    formData.append('file',file)
    console.log(formData)
  

    // const blob = new Blob(file, { type: 'text/csv,charset=UTF-8' });
    postAccountUpload(formData )

    // const link = document.createElement('a');
    // link.href = window.URL.createObjectURL(file);
    // link.download = 'test.csv';
    // link.click();
    // window.URL.revokeObjectURL(link.href);
    // }
    // };
    // getFileContent(0);
  }
  const onSearch = () => {
    console.log("aa")
  };

  const columns = [
    {
      title: '帳號名稱',
      key: 'account_name',
      dataIndex: 'name',
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: '身份權限',
      key: 'identity',
      dataIndex: 'group', // 修改这里为 'group'
      render: groups => groups.join(' / '), // 使用render方法将数组转换为字符串
      filters: [
        {
          text: '總處管理員',
          value: '總處管理員',
        },
        {
          text: '總處操作員',
          value: '總處操作員',
        },
        {
          text: '區處管理員',
          value: '區處管理員',
        },
        {
          text: '區處操作員',
          value: '區處操作員',
        },
      ],
      onFilter: (value, record) => record.group.includes(value),
    },
    {
      title: '編輯',
      key: 'edit',
      dataIndex: 'edit',
      render: (text, record) => (
        <button class="btn-manage justify-self-end mr-4" onClick={() => { _history.push(`/manage/user/${record.user_id}`) }}>
          編輯
        </button>
      ),
    },
  ]
  const filteredData = USER_DATA.filter(user => user.name.includes(searchText) || user.group.some(group => group.includes(searchText)));
  return (
    <Layout class="px-20 py-12 manage-wrapper bg-gray-100 minHeight">
      <Header class="pt-4 pb-8 flex space-x-7 items-center">
        <h2 class="flex-auto font-bold text-2xl">帳號管理</h2>
        <div class="flex h-10">
          <Search
            placeholder="請輸入帳號名稱或身份權限"
            size="large"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}

          />
          {/* <button className="btn-manage btn-manage-full flex-none h-10">
              <SearchOutlined />搜尋
            </button> */}
        </div>

        <label for="upload-user" id="upload-user-label">
          <button class="btn-manage btn-manage-full flex-none h-10" onClick={importSuccess} >匯入會員資料</button>
        </label>
        <input type="file"
          accept={[".csv.gz", ".csv"]}
          id="upload-user"
          onChange={(e) => {
            handleFileUpload();
          }}
          name="file" />

        {/* <button class="btn-manage btn-manage-full flex-none h-10" onClick={()=>_history.push('/manage/user/create')}>匯入會員資料</button> */}
        {/* <button class="btn-manage btn-manage-full flex-none h-10" onClick={() => _history.push('/manage/user/create')}>匯出會員資料</button> */}
        <button className={` flex-none h-10 ${downloading?"btn-manage btn-disable":"btn-manage btn-manage-full"}`} disabled={downloading} onClick={handleDownLoadAccountList}>匯出會員資料</button>
      </Header>
      <Content>
        <Layout>
          {/* <Header class="pl-16 user-grid-row h-14 bg-purple-400 text-white font-medium text-base"> */}
         
          { 
            isLoading?
              <Spin  tip="載入中" size="large" style={{marginTop:'112px'}}>
                <div className="content" />
              </Spin>    
              :
              <Table columns={columns} dataSource={userManage.userList} onChange={onChange} pagination={{ current: currentPage, total: userManage.userList.length, onChange: handlePaginationChange, style:{marginRight:'20px'} }} />

          }
          
          {/* <div class="col-span-1">帳號名稱</div>
            <div>身份權限</div> */}
          {/* <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Hover me
                <DownOutlined />
              </Space>
            </a>
          </Dropdown> */}
          {/* </Header> */}
          {/* <Content class="px-8 py-7">
            {USER_DATA.map((user) => <UserItem user={user} />)}
            <div class="flex justify-end py-3 border-purple-400">
              <Pagination defaultCurrent={1} total={50} />
            </div>
          </Content> */}
        </Layout>
      </Content>
    </Layout>
  );

}
const mapStateToProps = ({ userManageReducer }) => ({
  userManage: userManageReducer,
});

const mapDispatchToProps = {
  saveUserListApi,
  saveUserListEdit
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

// function UserItem({ user }) {
//   const _history = useHistory()

//   return (
//     <>
//       <div class="user-grid-row pt-1">
//         <div class="col-span-1">{user.name}</div>
//         <div class="col-span-2">{user.group.join(' / ')}</div>
//         <button class="btn-manage justify-self-end mr-4" onClick={() => { _history.push(`/manage/user/${user.user_id}`) }}>編輯</button>
//       </div>
//       <Divider />
//     </>
//   );

// }
