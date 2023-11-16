//推播管理
//antd
import { Divider, Layout, Input, Table } from 'antd';
import { DownOutlined, SearchOutlined, CheckCircleFilled, CloseCircleFilled, ExclamationCircleOutlined} from '@ant-design/icons';
import { Dropdown, Space, Button, Select, Modal, Popconfirm } from 'antd';
import { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { useHistory } from 'react-router-dom';
import './manage.css'

const { Header, Content } = Layout;
const { Search } = Input
const { Option } = Select;
const { confirm } = Modal;

export const USER_DATA = [
    {
        user_id: 0,
        label: ['群組名稱1'],
        name: 'User_001',
        // group: ['區處管理者', '運維人員'],
        // email: 'user1@gmail.com',
        // line_state: true
    },
    {
        user_id: 1,
        label: ['群組名稱1', '群組名稱3'],
        name: 'User_002',
        // group: ['運維人員'],
        // email: 'user2@gmail.com',
        // line_state: true
    },
    {
        user_id: 2,
        label: ['群組名稱1','群組名稱2', '群組名稱3'],
        name: 'User_003',
        // group: ['區處檢修人員'],
        // email: 'user3@gmail.com',
        // line_state: false
    },
    {
        user_id: 3,
        label: ['群組名稱1','群組名稱4'],
        name: 'User_004',
        // group: ['區處管理者', '運維人員'],
        // email: 'user4@gmail.com',
        // line_state: true
    },
    {
        user_id: 4,
        label: ['群組名稱1', '群組名稱3'],
        name: 'User_005',
        // group: ['運維人員'],
        // email: 'user5@gmail.com',
        // line_state: true
    },
    {
        user_id: 5,
        label: ['群組名稱1','群組名稱2', '群組名稱4'],
        name: 'User_006',
        // group: ['區處檢修人員'],
        // email: 'user6@gmail.com',
        // line_state: false
    },
    {
        user_id: 6,
        label: ['群組名稱1'],
        name: 'User_001',
        // group: ['區處管理者', '運維人員'],
        // email: 'user1@gmail.com',
        // line_state: true
    },
    {
        user_id: 7,
        label: ['群組名稱1', '群組名稱3'],
        name: 'User_002',
        // group: ['運維人員'],
        // email: 'user2@gmail.com',
        // line_state: true
    },
    {
        user_id: 8,
        label: ['群組名稱1','群組名稱2', '群組名稱3'],
        name: 'User_003',
        // group: ['區處檢修人員'],
        // email: 'user3@gmail.com',
        // line_state: false
    },
    {
        user_id: 9,
        label: ['群組名稱1','群組名稱4'],
        name: 'User_004',
        // group: ['區處管理者', '運維人員'],
        // email: 'user4@gmail.com',
        // line_state: true
    },
    {
        user_id: 10,
        label: ['群組名稱1', '群組名稱3'],
        name: 'User_005',
        // group: ['運維人員'],
        // email: 'user5@gmail.com',
        // line_state: true
    },
    {
        user_id: 11,
        label: ['群組名稱1','群組名稱2', '群組名稱4'],
        name: 'User_006',
        // group: ['區處檢修人員'],
        // email: 'user6@gmail.com',
        // line_state: false
    },
];
// export const LINEGROUPID = [
//     {
//         value: '1',
//         label: '群組名稱1',
//     },
//     {
//         value: '2',
//         label: '群組名稱2',
//     },
//     {
//         value: '3',
//         label: '群組名稱3',
//     },
//     {
//         value: '4',
//         label: '群組名稱4',
//     },
// ]
export const LINEGROUPID = [
    {
        value: '1',
        area: "台北市區",
        label: '群組名稱1',
        threshold: [
          { state: 1, limit_max: '70' },
          { state: 2, limit_max: '80' },
          { state: 3, limit_max: '90' },
        ],
      },
      {
        value: '2',
        area: "台北市區",
        label: '群組名稱2',
        threshold: [
          { state: 1, limit_max: '72' },
          { state: 2, limit_max: '82' },
          { state: 3, limit_max: '92' },
        ],
      },
      {
        value: '3',
        area: "台北市區",
        label: '群組名稱3',
        threshold: [
          { state: 1, limit_max: '73' },
          { state: 2, limit_max: '83' },
          { state: 3, limit_max: '93' },
        ],
      },
      {
        value: '4',
        area: "台北市區",
        label: '群組名稱4',
        threshold: [
          { state: 1, limit_max: '74' },
          { state: 2, limit_max: '84' },
          { state: 3, limit_max: '94' },
        ],
      },
]

function Notify() {
    const _history = useHistory()
    //設定Select資料
    const [groupData, setGroupData] = useState(LINEGROUPID);
    const [selectedGroup, setSelectedGroup] = useState(groupData[0]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    // 切換群組時更新列表資訊
    const handleGroupChange = (value) => {
        const selectedGroup = groupData.find((group) => group.value === value);
        setSelectedGroup(selectedGroup);

        // 過濾符合條件的帳號
        const usersInGroup = USER_DATA.filter((user) => user.label.includes(selectedGroup.label));
        setFilteredUsers(usersInGroup);
    };
    useEffect(() => {
        // 在組件初始化時進行一次過濾
        const initialUsersInGroup = USER_DATA.filter((user) => user.label.includes(groupData[0].label));
        setFilteredUsers(initialUsersInGroup);
      }, []);

    //設定table欄位
    const columns = [
        {
          title: ()=>{return <div class='font-medium text-base'>帳號</div> },
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: ()=>{return <button class="text-purple-400 font-bold text-3xl" onClick={showadduserModal}>+</button>},
          key: 'action',
          align: 'right',
          render: ()=> <button class=" btn-manage" style={{display: 'inline'}}>移除</button>, 
        },
    ];

    //當切換成不同群組時將列表切回第一頁
    const [currentPage, setCurrentPage] = useState(1);
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
      };

    //是否編輯
    const [isEdit, setIsEdit] = useState(false);
    const handleDelete = async () => {
        console.log("delete")
    }
    const handleSave = () => {
        console.log("save")
        setIsEdit(false)
    }

    //新增群組modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //新增帳號modal
    const [isadduserModalOpen, setIsadduserModalOpen] = useState(false);
    const showadduserModal = () => {
        setIsadduserModalOpen(true);
    };
    const handleOk_adduser = () => {
        setIsadduserModalOpen(false);
    };
    const handleCancel_adduser = () => {
        setIsadduserModalOpen(false);
    };



    return (
        <Layout class="px-20 py-12 manage-wrapper bg-gray-100">
            <Content>
                <Header class="pt-4 pb-8 flex space-x-7 items-center">
                    <h2 class="flex-auto font-bold text-2xl">推播管理</h2>

                    {/* <button class="btn-manage justify-self-end mr-4 bg-white font-bold" onClick={showModal} >新增群組</button> */}
                    {/* <Modal title="新增群組" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="新增" cancelText="取消">
                        <div class="flex mb-3"><p>縣市：</p><div class=" w-72"><Input /></div></div>
                        <div class="flex mb-3"><p>群組名稱：</p><div class=" w-72"><Input /></div></div>
                        <div  class="flex row ">
                            <div class="flex mb-3"><p class="mr-2">一般 警告門檻：低於 </p><div class=" w-16 mr-2"><Input /></div><p> %</p></div>
                            <div class="flex mb-3"><p class="mr-2">高於</p><div class=" w-16 mr-2"><Input /></div><p> %</p></div>
                        </div>
                        <div  class="flex row">
                            <div class="flex mb-3"><p class="mr-2">中度 警告門檻：低於 </p><div class=" w-16 mr-2"><Input /></div><p> %</p></div>
                            <div class="flex mb-3"><p class="mr-2">高於</p><div class=" w-16 mr-2 "><Input /></div><p> %</p></div>
                        </div>
                        <div  class="flex row">
                            <div class="flex mb-3"><p class="mr-2">重度 警告門檻：低於 </p><div class=" w-16 mr-2"><Input /></div><p> %</p></div>
                            <div class="flex mb-3"><p class="mr-2">高於</p><div class=" w-16 mr-2 "><Input /></div><p> %</p></div>
                        </div>
                    </Modal> */}
                </Header>
                <Content class=" bg-white">
                    <div class=" p-10">
                        <span class="font-bold">推播群組：</span>
                        <Select
                            defaultValue='台北市區'
                            style={{ width: 120, marginRight: '8px' }}
                            >
                            <Option key= 'taipei'value='台北市區'>
                                台北市區
                            </Option>
                        </Select>
                        <Select
                            defaultValue={groupData[0].value}
                            style={{ width: 120 }}
                            onChange={handleGroupChange}
                            >
                            {groupData.map((group) => (
                                <Option key={group.value} value={group.value}>
                                    {group.label}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div class=" px-10 pb-10 flex justify-between">
                        <div class="flex">
                            <span class="font-bold">警告門檻：</span>
                            <div>
                                {/* <div  class="flex row "> */}
                                {selectedGroup.threshold.map((item) => (
                                    <div key={item.state} className="flex mb-3">
                                    <div class="flex row ">
                                        <p className={`mr-2 ${item.state === 1 ? 'normal-style' : (item.state === 2 ? 'medium-style' : 'heavy-style')}`}>
                                        {item.state === 1 && '一般'}
                                        {item.state === 2 && '中度'}
                                        {item.state === 3 && '重度'}
                                        </p>
                                        <p class="mr-2">警告門檻：{`高於 ${item.limit_max}`} %</p>
                                    </div>
                                    </div>
                                ))}
                                {/* </div> */}
                            </div>
                            {/* 修改  */}
                            {/* {isEdit ? 
                                <div class="flex">
                                    <div>
                                    <div  class="flex row ">
                                        <div class="flex mb-3"><p class="mr-2">一般 警告門檻：低於 </p><div class=" w-16 mr-2"><Input /></div><p> %</p></div>
                                        <div class="flex mb-3"><p class="mr-2">高於</p><div class=" w-16 mr-2"><Input /></div><p> %</p></div>
                                    </div>
                                    <div  class="flex row">
                                        <div class="flex mb-3"><p class="mr-2">中度 警告門檻：低於 </p><div class=" w-16 mr-2"><Input /></div><p> %</p></div>
                                        <div class="flex mb-3"><p class="mr-2">高於</p><div class=" w-16 mr-2 "><Input /></div><p> %</p></div>
                                    </div>
                                    <div  class="flex row">
                                        <div class="flex mb-3"><p class="mr-2">重度 警告門檻：低於 </p><div class=" w-16 mr-2"><Input /></div><p> %</p></div>
                                        <div class="flex mb-3"><p class="mr-2">高於</p><div class=" w-16 mr-2 "><Input /></div><p> %</p></div>
                                    </div>
                                    </div>
                                </div>
                                :
                                //修改完後的顯示
                                <span class="font-bold">低於 10% 高於80%</span>
                            } */}

                        </div>
                        {/* {isEdit ?
                            <div class="flex">
                                <button class="btn-manage justify-self-end mr-4 btn-manage-full" >刪除群組</button>
                                <button class="btn-manage justify-self-end mr-4 btn-manage-full" onClick={handleSave}>儲存</button>
                            </div>
                            :
                            <button class="btn-manage justify-self-end mr-4 btn-manage-full" onClick={() => setIsEdit(true)} >編輯</button>
                        } */}

                    </div>

                </Content>
            </Content>
            <div class="my-7 font-bold text-base">推播帳號列表</div>
            <Content>

                <Layout class="p-7 bg-white">
                    {/* <Header class="pl-16 user-grid-row h-14 bg-gray-200 font-medium text-base account-list"> */}
                        {/* <div >帳號</div> */}
                        {/* <div class="col-span-1">電子信箱</div>
                        <div class="col-span-1">LINE 連接狀態</div> */}
                        {/* <button class="pr-10   text-purple-400 font-bold text-3xl" onClick={showadduserModal}>+</button> */}
                        <Modal title="新增帳號" visible={isadduserModalOpen} onOk={handleOk_adduser} onCancel={handleCancel_adduser} okText="新增" cancelText="取消">
                            <div class="flex mb-3"><p>帳號：</p><div class=" w-72"><Input /></div></div>
                        </Modal>
                    {/* </Header> */}
                    
                    <Content class="p-3 bg-white">
                        <Table
                            columns={columns}
                            dataSource={filteredUsers}
                            pagination={{ current: currentPage, total: filteredUsers.length, onChange: handlePaginationChange }}
                        />
                        {/* {filteredUsers.map((user) => (
                            <UserItem key={user.user_id} user={user} />
                        ))}
                        <div class="flex justify-end py-3 border-purple-400">
                            <Pagination defaultCurrent={1} total={50} />
                        </div> */}
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );

}
export default Notify;

function UserItem({ user }) {
    const _history = useHistory()

    return (
        <>
            <div class="user-grid-row pt-1 account-list">
                <div>{user.name}</div>
                {/* <div class="col-span-1">{user.email}</div> */}
                {/* <div class=" ml-4">
                    {user.line_state ?
                        <CheckCircleFilled style={{ fontSize: '20px', color: '#7ACA00' }} />
                        :
                        <CloseCircleFilled style={{ fontSize: '20px', color: '#F66C55' }} />
                    }
                </div> */}
                <button class="btn-manage justify-self-end " >移除</button>
            </div>
            <Divider />
        </>
    );

}
