//帳號管理
//antd
import { Divider, Layout, Input, Table } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useState } from 'react';
import { Pagination } from 'antd';
import { useHistory } from 'react-router-dom';


const { Header, Content } = Layout;
const { Search } = Input


export const USER_DATA = [
  {
    user_id: 0,
    name: 'User_001',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com'
  },
  {
    user_id: 1,
    name: 'User_002',
    group: ['區處操作員'],
    email: 'aaa123@gmail.com'
  },
  {
    user_id: 2,
    name: 'User_003',
    group: ['區處管理員'],
    email: 'aaa123@gmail.com'
  },
  {
    user_id: 3,
    name: 'User_004',
    group: ['區處管理員'],
    email: 'aaa123@gmail.com'
  },
  {
    user_id: 4,
    name: 'User_005',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com'
  },
  {
    user_id: 5,
    name: 'User_006',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com'
  },
  {
    user_id: 6,
    name: 'User_007',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com'
  },
  {
    user_id: 7,
    name: 'User_008',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com'
  },
  {
    user_id: 8,
    name: 'User_009',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com'
  },
  {
    user_id: 9,
    name: 'User_010',
    group: ['區處管理員', '區處操作員'],
    email: 'aaa123@gmail.com'
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

function UserList() {
  const _history = useHistory()
  const [searchText, setSearchText] = useState('');
  const onClick = ({ key }) => {
    console.log("aa")
  };

  const onSearch = () => {
    console.log("aa")
  };
  
  const columns = [
    {
      title:'帳號名稱',
      key: 'account_name',
      dataIndex: 'name',
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title:'身份權限',
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
      title:'編輯',
      key: 'edit',
      dataIndex: 'edit',
      render: (text, record) => (
        <button class="btn-manage justify-self-end mr-4" onClick={() => { _history.push(`/manage/user/${record.user_id}`) }}>
          編輯
        </button>
      ),
    },
  ]
  const filteredData = USER_DATA.filter(user => user.name.includes(searchText));
  return (
    <Layout class="px-20 py-12 manage-wrapper bg-gray-100">
      <Header class="pt-4 pb-8 flex space-x-7 items-center">
        <h2 class="flex-auto font-bold text-2xl">帳號管理</h2>
        <div class="flex h-10">
          <Search
              placeholder="請輸入帳號名稱"
              size="large"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              
            />
            {/* <button className="btn-manage btn-manage-full flex-none h-10">
              <SearchOutlined />搜尋
            </button> */}
        </div>
        <button class="btn-manage btn-manage-full flex-none h-10" onClick={()=>_history.push('/manage/user/create')}>匯入會員資料</button>
        <button class="btn-manage btn-manage-full flex-none h-10" onClick={()=>_history.push('/manage/user/create')}>匯出會員資料</button>
      </Header>
      <Content>
        <Layout>
          {/* <Header class="pl-16 user-grid-row h-14 bg-purple-400 text-white font-medium text-base"> */}
          <Table columns={columns} dataSource={filteredData}  onChange={onChange} pagination={{ defaultCurrent: 1, total: 50 }}  />
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
export default UserList;

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
