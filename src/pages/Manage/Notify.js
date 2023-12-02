//推播管理
//antd
import { Divider, Layout, Input, Table } from 'antd';
import { DownOutlined, SearchOutlined, CheckCircleFilled, CloseCircleFilled, ExclamationCircleOutlined} from '@ant-design/icons';
import { Dropdown, Space, Button, Select, Modal, Popconfirm } from 'antd';
import { useState, useEffect } from 'react';
// import { Pagination } from 'antd';
import { useHistory } from 'react-router-dom';
import './manage.css'

const { Header, Content } = Layout;
const { Search } = Input
const { Option } = Select;
const { confirm } = Modal;

export const USER_DATA = [
    {
        user_id: 0,
        area: ['台北市區'],
        name: 'User_001',
        // group: ['區處管理者', '運維人員'],
        // email: 'user1@gmail.com',
        line_state: true
    },
    {
        user_id: 1,
        area: ['台北市區', '高雄市區'],
        name: 'User_002',
        // group: ['運維人員'],
        // email: 'user2@gmail.com',
        line_state: true
    },
    {
        user_id: 2,
        area: ['台北市區','新竹市區', '高雄市區'],
        name: 'User_003',
        // group: ['區處檢修人員'],
        // email: 'user3@gmail.com',
        line_state: false
    },
    {
        user_id: 3,
        area: ['台北市區','新北市區'],
        name: 'User_004',
        // group: ['區處管理者', '運維人員'],
        // email: 'user4@gmail.com',
        line_state: true
    },
    {
        user_id: 4,
        area: ['台北市區', '高雄市區'],
        name: 'User_005',
        // group: ['運維人員'],
        // email: 'user5@gmail.com',
        line_state: true
    },
    {
        user_id: 5,
        area: ['台北市區','新竹市區', '新北市區'],
        name: 'User_006',
        // group: ['區處檢修人員'],
        // email: 'user6@gmail.com',
        line_state: false
    },
    {
        user_id: 6,
        area: ['台北市區'],
        name: 'User_007',
        // group: ['區處管理者', '運維人員'],
        // email: 'user1@gmail.com',
        line_state: true
    },
    {
        user_id: 7,
        area: ['台北市區', '高雄市區'],
        name: 'User_008',
        // group: ['運維人員'],
        // email: 'user2@gmail.com',
        line_state: true
    },
    {
        user_id: 8,
        area: ['台北市區','新竹市區', '高雄市區'],
        name: 'User_009',
        // group: ['區處檢修人員'],
        // email: 'user3@gmail.com',
        line_state: false
    },
    {
        user_id: 9,
        area: ['台北市區','新北市區'],
        name: 'User_010',
        // group: ['區處管理者', '運維人員'],
        // email: 'user4@gmail.com',
        line_state: true
    },
    {
        user_id: 10,
        area: ['台北市區', '高雄市區'],
        name: 'User_011',
        // group: ['運維人員'],
        // email: 'user5@gmail.com',
        line_state: true
    },
    {
        user_id: 11,
        area: ['台北市區','新竹市區', '新北市區'],
        name: 'User_012',
        // group: ['區處檢修人員'],
        // email: 'user6@gmail.com',
        line_state: false
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
        label: "台北市區",
        // label: '群組名稱1',
        threshold: [
          { state: 1, limit_max: '70' },
          { state: 2, limit_max: '80' },
          { state: 3, limit_max: '90' },
        ],
      },
      {
        value: '2',
        area: "新北市區",
        label: "新北市區",
        // label: '群組名稱2',
        threshold: [
          { state: 1, limit_max: '72' },
          { state: 2, limit_max: '82' },
          { state: 3, limit_max: '92' },
        ],
      },
      {
        value: '3',
        area: "新竹市區",
        label: "新竹市區",
        // label: '群組名稱3',
        threshold: [
          { state: 1, limit_max: '73' },
          { state: 2, limit_max: '83' },
          { state: 3, limit_max: '93' },
        ],
      },
      {
        value: '4',
        area: "高雄市區",
        label: "高雄市區",
        // label: '群組名稱4',
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
    const [userData, setUserData] = useState(USER_DATA);
    // 切換群組時更新列表資訊
    const handleGroupChange = (value) => {
        const selectedGroup = groupData.find((group) => group.value === value);
        setSelectedGroup(selectedGroup);

        // 過濾符合條件的帳號
        const usersInGroup = userData.filter((user) => user.area.includes(selectedGroup.area));
        setFilteredUsers(usersInGroup);
    };
    useEffect(() => {
        // 在組件初始化時進行一次過濾
        const initialUsersInGroup = userData.filter((user) => user.area.includes(groupData[0].area));
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
            title: ()=>{return <div class='font-medium text-base'>LINE 連接狀態</div> },
            dataIndex: 'line_state',
            key: 'line_state',
            render: (record) => (
                <div>
                    {record ?
                        <CheckCircleFilled style={{ fontSize: '20px', color: '#7ACA00' }} />
                        :
                        <CloseCircleFilled style={{ fontSize: '20px', color: '#F66C55' }} />
                    }
                </div>
            )
        },
        {
          title: ()=>{return <button class="text-purple-400 font-bold text-3xl" onClick={showadduserModal}>+</button>},
          key: 'action',
          align: 'right',
          render: (text, record) => (
            <button className="btn-manage" style={{ display: 'inline' }} onClick={() => showConfirm(record.user_id)}>
              移除
            </button>
          ), 
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

    //確認移除modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const showConfirm = (userId) => {
        confirm({
          title: '移除帳號',
          icon: <ExclamationCircleOutlined />,
          content: '確定將此帳號移出此群組？',
          onOk: () => handleRemoveUser(userId),
        //   onCancel: () => handleCancel(),
          okText: "移除",
          cancelText: "取消",
          okButtonProps :{
            danger: true,
          }
        });
        // setIsModalOpen(true);
    };
    const handleRemoveUser = (userId) => {
        // 在這裡處理移除用戶的邏輯
        const updatedUserData = USER_DATA.map((user) => {
          if (user.user_id === userId) {
            // 找到相應的用戶，並移除選定群組的 label
            user.area = user.area.filter((groupLabel) => groupLabel !== selectedGroup.area);
          }
          return user;
        });
        setUserData(updatedUserData)
        console.log('UserData data', userData)
        // 更新 USER_DATA
        // 注意：這裡應該使用您的狀態管理或後端服務來更新數據，這裡只是一個範例
        // setUserData(updatedUserData);
      };
    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };

    //新增帳號modal
    const [isadduserModalOpen, setIsadduserModalOpen] = useState(false);
    const [newAccountName, setNewAccountName] = useState('');
    const [modalContent, setModalContent] = useState(null);
    const showadduserModal = () => {
        setIsadduserModalOpen(true);
    };
    const handleOk_adduser = () => {
        // 在這裡處理新增帳號的邏輯

        // 檢查輸入的帳號是否存在於 USER_DATA 中的 name 中
        const existingUser = userData.find((user) => user.name === newAccountName);

        if (existingUser) {
        // 如果帳號存在，檢查是否已經存在於選定群組的 label 中
        if (existingUser.area.includes(selectedGroup.area)) {
            // 帳號已經存在於群組中
            setModalContent(
            <p className="text-red-500">
                *此帳號已存在於此群組中。
            </p>
            );
        } else {
            // 帳號不存在於群組中，新增群組
            existingUser.area.push(selectedGroup.area);
            setModalContent(
            <p className="text-green-500">
                *帳號成功添加到此群組。
            </p>
            );
            setIsadduserModalOpen(false);
            console.log('new user data', existingUser, userData)
        }
        } else {
        // 帳號不存在
        setModalContent(
            <p className="text-red-500">
            *此帳號不存在。請確保輸入的帳號正確。
            </p>
        );
        }
    };

    const handleCancel_adduser = () => {
        // 重置輸入的值、提示信息，並禁用 OK 按鈕
        setNewAccountName('');
        setModalContent(null);
        setIsadduserModalOpen(false);
    };

    const onSearch = (value) => {
        console.log('search:', value);
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
                        <span class="font-bold">推播區處：</span>
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                                defaultValue={groupData[0].value}
                                style={{ width: 120 }}
                                onChange={handleGroupChange}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').includes(input)
                                }
                            >
                                {groupData.map((group) => (
                                    <Option key={group.value} value={group.value} label={group.area} class='select-search-input'>
                                        {group.area}
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
                        <Modal
                            title="新增帳號"
                            open={isadduserModalOpen}
                            onOk={handleOk_adduser}
                            onCancel={handleCancel_adduser}
                            okText="新增"
                            cancelText="取消"
                            >
                            <div className="flex mb-3">
                                <p>帳號：</p>
                                <div className="w-72">
                                <Input value={newAccountName} onChange={(e) => setNewAccountName(e.target.value)} />
                                </div>
                            </div>
                            {modalContent}
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
