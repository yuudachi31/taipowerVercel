//閥值管理
//antd
import { Divider, Layout, Input } from 'antd';
// import { DownOutlined, SearchOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Dropdown, Space, Button, Select, Modal, Popconfirm } from 'antd';
import { useState } from 'react';
// import { Pagination } from 'antd';
import { useHistory } from 'react-router-dom';
import './manage.css'

const { Header, Content } = Layout;
const { Search } = Input
const { Option } = Select;

// export const USER_DATA = [
//     {
//         user_id: 0,
//         name: 'User_001',
//         group: ['區處管理者', '運維人員'],
//         email: 'user1@gmail.com',
//         line_state: true
//     },
//     {
//         user_id: 1,
//         name: 'User_002',
//         group: ['運維人員'],
//         email: 'user2@gmail.com',
//         line_state: true
//     },
//     {
//         user_id: 2,
//         name: 'User_003',
//         group: ['區處檢修人員'],
//         email: 'user3@gmail.com',
//         line_state: false
//     },
// ];
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

function Threshold() {
    const _history = useHistory()

    //是否編輯
    const [isEdit, setIsEdit] = useState(false);
    const handleDelete = async (value) => {
        console.log("delete", value)
    }

    //設定select內容

    const [groupData, setGroupData] = useState(LINEGROUPID);
    const [selectedGroup, setSelectedGroup] = useState(groupData[0]);
    const handleGroupChange = (value) => {
        const selectedGroup = groupData.find((group) => group.value === value);
        setSelectedGroup(selectedGroup);
    };
    
    //實現編輯儲存
    const [editedThresholds, setEditedThresholds] = useState(() => {
        // 使用物件映射初始化編輯狀態
        const initialThresholds = {};
        groupData.forEach((group) => {
          initialThresholds[group.value] = group.threshold.map(item => ({ ...item }));
        });
        return initialThresholds;
    });

    const handleInputChange = (e, groupId, index) => {
        const value = e.target.value;
        setEditedThresholds((prev) => {
          const newThresholds = { ...prev };
          newThresholds[groupId][index].limit_max = value;
          return newThresholds;
        });
    };

    const handleSave = (groupId) => {
        console.log("save", groupId, editedThresholds[groupId]);
        const newGroupData = groupData.map((item) => {
            if (item.value === groupId) {
                return {
                    ...item,
                    threshold: editedThresholds[groupId],
                };
            }
            return item;
        });
        setGroupData(newGroupData);
        const selectedGroup = newGroupData.find((group) => group.value === groupId);
        setSelectedGroup(selectedGroup);
        console.log("newGroupData", newGroupData, groupData, editedThresholds[groupId], selectedGroup);
        setIsEdit(false);
    };
    
    // //新增群組modal
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const showModal = () => {
    //     setIsModalOpen(true);
    // };
    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };
    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };

    // //新增帳號modal
    // const [isadduserModalOpen, setIsadduserModalOpen] = useState(false);
    // const showadduserModal = () => {
    //     setIsadduserModalOpen(true);
    // };
    // const handleOk_adduser = () => {
    //     setIsadduserModalOpen(false);
    // };
    // const handleCancel_adduser = () => {
    //     setIsadduserModalOpen(false);
    // };



    return (
        <Layout class="px-20 py-12 manage-wrapper bg-gray-100 minHeight">
            <Content>
                <Header class="pt-4 pb-8 flex space-x-7 items-center">
                    <h2 class="flex-auto font-bold text-2xl">閥值管理</h2>

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
                        <span class="font-bold">台北市區：</span>
                        {/* <Select
                            defaultValue="1"
                            style={{
                                width: 120,
                            }}
                            // onChange={handleChange}
                            options={groupData}
                        /> */}
                        {isEdit ?
                            <Select
                                defaultValue={groupData[0].value}
                                style={{ width: 120 }}
                                onChange={handleGroupChange}
                                disabled
                                >
                                {groupData.map((group) => (
                                    <Option key={group.value} value={group.value}>
                                        {group.label}
                                    </Option>
                                ))}
                            </Select>
                        :
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
                        }           
                    </div>
                    <div class=" px-10 pb-10 flex justify-between">
                        <div class="flex">
                            <span class="font-bold">警告門檻：</span>
                            {/* 修改  */}
                            {isEdit ? 
                                <div class="flex">
                                    <div>
                                        {editedThresholds[selectedGroup.value].map((item, index) => (
                                            <div key={item.state} className="flex mb-3">
                                            <div className="flex row">
                                                <p className={`mr-2 ${item.state === 1 ? 'normal-style' : (item.state === 2 ? 'medium-style' : 'heavy-style')}`}>
                                                {item.state === 1 && '一般'}
                                                {item.state === 2 && '中度'}
                                                {item.state === 3 && '重度'}
                                                </p>
                                                <p className="mr-2">警告門檻：高於 </p>
                                                <p className="w-16 mr-2">
                                                <Input
                                                    value={item.limit_max}
                                                    onChange={(e) => handleInputChange(e, selectedGroup.value, index)}
                                                />
                                                </p>
                                                <p className="mr-2"> %</p>
                                            </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                :
                                //修改完後的顯示
                                <div class="flex">
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
                                </div>
                            }

                        </div>
                        {isEdit ?
                            <div class="flex2">
                                <button class="btn-manage justify-self-end mr-4 btn-manage-full"  onClick={() => handleDelete(selectedGroup.value)}>刪除群組</button>
                                <button class="btn-manage justify-self-end mr-4 btn-manage-full"  onClick={() => handleSave(selectedGroup.value)}>儲存</button>
                            </div>
                            :
                            <div class="flex2">
                                <button class="btn-manage justify-self-end  mr-4 btn-manage-full" onClick={() => setIsEdit(true)} >編輯</button>
                            </div>
                        }


                    </div>

                </Content>
            </Content>
            {/* <div class="my-7 font-bold text-base">推播帳號列表</div>
            <Content>

                <Layout class="p-7 bg-white">
                    <Header class="pl-16 user-grid-row h-14 bg-gray-200 font-medium text-base">
                        <div class="col-span-1">帳號</div>
                        <div class="col-span-1">電子信箱</div>
                        <div class="col-span-1">LINE 連接狀態</div>
                        <button class="col-span-1 flex justify-center text-purple-400 font-bold text-3xl" onClick={showadduserModal}>+</button>
                        <Modal title="新增帳號" visible={isadduserModalOpen} onOk={handleOk_adduser} onCancel={handleCancel_adduser} okText="新增" cancelText="取消">
                            <div class="flex mb-3"><p>帳號：</p><div class=" w-72"><Input /></div></div>

                        </Modal>
                    </Header>
                    <Content class="px-8 py-7 bg-white">
                        {USER_DATA.map((user) => <UserItem user={user} />)}
                        <div class="flex justify-end py-3 border-purple-400">
                            <Pagination defaultCurrent={1} total={50} />
                        </div>
                    </Content>
                </Layout>
            </Content> */}
        </Layout>
    );

}
export default Threshold;

// function UserItem({ user }) {
//     const _history = useHistory()

//     return (
//         <>
//             <div class="user-grid-row pt-1">
//                 <div class="col-span-1">{user.name}</div>
//                 <div class="col-span-1">{user.email}</div>
//                 <div class=" ml-4">
//                     {user.line_state ?
//                         <CheckCircleFilled style={{ fontSize: '20px', color: '#7ACA00' }} />
//                         :
//                         <CloseCircleFilled style={{ fontSize: '20px', color: '#F66C55' }} />
//                     }
//                 </div>


//                 <button class="btn-manage justify-self-end mr-4" >移除</button>
//             </div>
//             <Divider />
//         </>
//     );

//}
