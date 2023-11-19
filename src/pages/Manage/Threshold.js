//閥值管理
//antd
import { Divider, Layout, Input } from 'antd';
import { DownOutlined, SearchOutlined, CheckCircleFilled, CloseCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button, Select, Modal, Popconfirm } from 'antd';
import { useState, useEffect } from 'react';
// import { Pagination } from 'antd';
import { useHistory } from 'react-router-dom';
import './manage.css'

const { Header, Content } = Layout;
const { Search } = Input
const { Option } = Select;
const { confirm } = Modal;

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
        coor: "圖號座標1",
        groups: [{
            group: '群組名稱1',
            threshold: [
              { state: 1, limit_max: '70' },
              { state: 2, limit_max: '80' },
              { state: 3, limit_max: '90' },
            ],
        },{
            group: '群組名稱2',
            threshold: [
              { state: 1, limit_max: '72' },
              { state: 2, limit_max: '82' },
              { state: 3, limit_max: '92' },
            ],
        }],

    },
    {
        value: '2',
        coor: "圖號座標2",
        groups: [{
            group: '群組名稱3',
            threshold: [
              { state: 1, limit_max: '73' },
              { state: 2, limit_max: '83' },
              { state: 3, limit_max: '93' },
            ],
        },{
            group: '群組名稱4',
            threshold: [
            { state: 1, limit_max: '74' },
            { state: 2, limit_max: '84' },
            { state: 3, limit_max: '94' },
            ],
        }],

    },
]

function Threshold() {
    const _history = useHistory()

    //是否編輯
    const [isEdit, setIsEdit] = useState(false);

    //設定select內容
    const [coorData, setCoorData] = useState(LINEGROUPID);
    const [selectedCoor, setSelectedCoor] = useState(coorData[0]);
    const [selectedGroup, setSelectedGroup] = useState(selectedCoor.groups[0]);
    const handleCoorChange = (value) => {
        const selectedCoor = coorData.find((coor) => coor.value === value);
        setSelectedCoor(selectedCoor);
    };

    useEffect(() => {
        // 確保當座標變更時，選擇第一個群組
        setSelectedGroup(selectedCoor.groups[0]);
    }, [selectedCoor]);

    //實現編輯儲存
    const [editedThresholds, setEditedThresholds] = useState(() => {
        // 使用物件映射初始化編輯狀態
        const initialThresholds = {};
        coorData.forEach((coor) => {
            initialThresholds[coor.value] = coor.groups.map(group => ({
                group: group.group,
                threshold: group.threshold.map(item => ({ ...item })),
            }));
        });
        return initialThresholds;
    });
    console.log('editedThresholds',editedThresholds, editedThresholds[selectedCoor.value])

    const handleInputChange = (e, coorId, groupId, index) => {
        const value = e.target.value;
        const newThresholds = editedThresholds[coorId].map((group) => {
            if (group.group === groupId) {
                return {
                    ...group,
                    threshold: group.threshold.map((item) => {
                        if (item.state === index + 1) {
                            return {
                                ...item,
                                limit_max: value,
                            };
                        }
                        return item;
                    }),
                };
            }
            return group;
        });
    
        // 使用 map 更新整個 editedThresholds
        setEditedThresholds((prev) => {
            const newThresholdsMap = { ...prev };
            newThresholdsMap[coorId] = newThresholds;
            return newThresholdsMap;
        });
    };
    console.log('editedThresholds edit2',editedThresholds, editedThresholds[selectedCoor.value])

    const handleSave = (coorId, groupId) => {
        console.log("save", coorId, groupId, editedThresholds[coorId][groupId]);
        // const newCoorData = editedThresholds.map((coor) => { //之後coorData
        //     if (indexOf(coor)+1 === coorId) {
        //         return {
        //             ...coor,
        //             groups: coor.groups.map((group) => {
        //                 if (group.group === groupId) {
        //                     return {
        //                         ...group,
        //                         threshold: editedThresholds[coorId][groupId],
        //                     };
        //                 }
        //                 return group;
        //             }),
        //         };
        //     }
        //     return coor;
        // });
        // setCoorData(newCoorData);
        // const selectedCoor = newCoorData.find((coor) => coor.value === coorId);
        // setSelectedCoor(selectedCoor);
        // console.log("newCoorData", newCoorData, coorData, editedThresholds[coorId][groupId], selectedCoor);
        setIsEdit(false);
    };

    //刪除群組Confirm
    const showConfirm = (coorId) => {
        confirm({
            title: '刪除群組',
            icon: <ExclamationCircleOutlined />,
            content: '確定刪除這個群組資料？',
            onOk: () => handleOk(coorId),
            okText: "刪除",
            cancelText: "取消",
            okButtonProps: {
                danger: true,
            }
        });
    };    
    
    const handleOk = (coorId) => {
        handleDelete(coorId, selectedGroup.group);
        setIsEdit(false);
    };
    
    
    // const handleCancel = () => {
    //     setIsEdit(false);
    // };

    //實現刪除
    const handleDelete = async (coorId, groupId) => {
        const newCoorData = editedThresholds[coorId].filter((group) => group.group !== groupId);
        // setCoorData(newCoorData);
        setEditedThresholds((prev) => {
            const newThresholdsMap = { ...prev };
            newThresholdsMap[coorId] = newCoorData;
            return newThresholdsMap;
        });
        
        // const selectedCoor = newCoorData.find((coor) => coor.value === coorId);
        setSelectedCoor((prev) => {
            return {
                ...prev,
                groups: test
            };
        });
        
        // setSelectedCoor(selectedCoor);
        // // 選擇第一個群組
        setSelectedGroup(selectedCoor.groups[0]);
        const upDateCoorData = coorData.map((data)=>{
            if (data.value === coorId) {
                return selectedCoor
            }
            return data
        });
        console.log("delete", newCoorData, coorId, groupId, editedThresholds, selectedCoor, upDateCoorData, test);
        // setCoorData((prev) => {
        //     return {
        //         ...prev,
        //         groups: prev.groups.filter((group) => group.group !== groupId)
        //     };
        // });
        // console.log("delete", newCoorData, coorId, groupId, editedThresholds, selectedCoor);
    };
    
    
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
                    {/* <Modal 
                        title="刪除群組" 
                        visible={isModalOpen} 
                        onOk={handleOk} 
                        onCancel={handleCancel} 
                        okText="新增" 
                        cancelText="取消"
                    >
                        <p>確定刪除這個群組資料？</p>
                    </Modal>  */}
                </Header>
                <Content class=" bg-white">
                    {isEdit ?
                        <div class=" p-10">
                            <span class="font-bold">選擇群組：</span>
                            {/* <Select
                                defaultValue="1"
                                style={{
                                    width: 120,
                                }}
                                // onChange={handleChange}
                                options={groupData}
                            /> */}
                        
                            <Select
                                defaultValue={coorData[0].value}
                                style={{ width: 120, marginRight: '8px' }}
                                disabled
                                onChange={(value) => {
                                    const selectedCoor = coorData.find((coor) => coor.value === value);
                                    setSelectedCoor(selectedCoor);
                                    // 更新第二個 Select 的選項，選擇第一個群組
                                    setSelectedGroup(selectedCoor.groups[0]);
                                }}
                            >
                                {coorData.map((coor) => (
                                    <Option key={coor.value} value={coor.value}>
                                        {coor.coor}
                                    </Option>
                                ))}
                            </Select>

                            <Select
                                defaultValue={selectedGroup.group}
                                style={{ width: 120 }}
                                disabled
                                onChange={(value) => {
                                    // 更新選擇的群組
                                    const selectedGroup = selectedCoor.groups.find((group) => group.group === value);
                                    setSelectedGroup(selectedGroup);
                                }}
                            >
                                {selectedCoor.groups.map((group) => (
                                    <Option key={group.group} value={group.group}>
                                        {group.group}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        :
                        <div class=" p-10">
                            <span class="font-bold">選擇群組：</span>
                            <Select
                                defaultValue={coorData[0].value}
                                style={{ width: 120, marginRight: '8px' }}
                                onChange={(value) => {
                                    const selectedCoor = coorData.find((coor) => coor.value === value);
                                    setSelectedCoor(selectedCoor);
                                    // 更新第二個 Select 的選項，選擇第一個群組
                                    setSelectedGroup(selectedCoor.groups[0]);
                                }}
                            >
                                {coorData.map((coor) => (
                                    <Option key={coor.value} value={coor.value}>
                                        {coor.coor}
                                    </Option>
                                ))}
                            </Select>

                            <Select
                                defaultValue={selectedGroup.group}
                                style={{ width: 120 }}
                                onChange={(value) => {
                                    // 更新選擇的群組
                                    const selectedGroup = selectedCoor.groups.find((group) => group.group === value);
                                    setSelectedGroup(selectedGroup);
                                }}
                            >
                                {selectedCoor.groups.map((group) => (
                                    <Option key={group.group} value={group.group}>
                                        {group.group}
                                    </Option>
                                ))}
                            </Select>

                                  
                        </div>
                        } 
                        <div class=" px-10 pb-10 flex justify-between">
                            <div class="flex">
                                <span class="font-bold">警告門檻：</span>
                                {/* 修改 */}
                                {isEdit ? (
                                    <div class="flex">
                                        <div>
                                            {editedThresholds[selectedCoor.value]?.find((group) => group.group === selectedGroup.group)
                                                ?.threshold.map((item, index) => (
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
                                                                    onChange={(e) => handleInputChange(e, selectedCoor.value, selectedGroup.group, index)}
                                                                />
                                                            </p>
                                                            <p className="mr-2"> %</p>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ) : (
                                    // 修改完後的顯示
                                    <div class="flex">
                                        <div>
                                            {editedThresholds[selectedCoor.value]?.find((group) => group.group === selectedGroup.group)
                                                ?.threshold.map((item) => (
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
                                        </div>
                                    </div>
                                )}

                        </div>

                        {isEdit ? (
                            <div class="flex2"> 
                                <button class="btn-manage justify-self-end mr-4 btn-manage-full" onClick={() => showConfirm(selectedCoor.value)}>刪除群組</button>
                                <button class="btn-manage justify-self-end mr-4 btn-manage-full" onClick={() => handleSave(selectedCoor.value, selectedGroup.group)}>儲存</button>
                            </div>
                        ) : (
                            <div class="flex2">
                                <button class="btn-manage justify-self-end  mr-4 btn-manage-full" onClick={() => setIsEdit(true)}>編輯</button>
                            </div>
                        )}

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
