//閥值管理
//antd
import { Divider, Layout, Input, Spin } from 'antd';
import { DownOutlined, SearchOutlined, CheckCircleFilled, CloseCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button, Select, Modal, Popconfirm } from 'antd';
import { useState, useEffect } from 'react';
import { getAllThreshold, getAllRegions, postRegionThreshold } from '../../api/frontApi'
// import { Pagination } from 'antd';
import { useHistory } from 'react-router-dom';
import './manage.css'

let userRole = null
if(document.cookie?.split("; ").find((row) => row.startsWith("roles"))?.split("=")[1]!=undefined){
   userRole = JSON.parse(document.cookie?.split("; ").find((row) => row.startsWith("roles"))?.split("=")[1])[0].role_name

}
const userRegion = document.cookie?.split("; ").find((row) => row.startsWith("region_id"))?.split("=")[1]

const { Header, Content } = Layout;
const { Search } = Input
const { Option } = Select;
const { confirm } = Modal;

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
        value: '00', //區處別
        area: " ",
        // label: '群組名稱1',
        threshold: [
            { state: 1, limit_max: ' ' },
            { state: 2, limit_max: ' ' },
            { state: 3, limit_max: ' ' },
        ],
    },
    {
        value: '11', //區處別
        area: " ",
        // label: '群組名稱2',
        threshold: [
            { state: 1, limit_max: '72' },
            { state: 2, limit_max: '82' },
            { state: 3, limit_max: '92' },
        ],
    },
    //   {
    //     value: '3',
    //     area: "台北市區",
    //     label: '群組名稱3',
    //     threshold: [
    //       { state: 1, limit_max: '73' },
    //       { state: 2, limit_max: '83' },
    //       { state: 3, limit_max: '93' },
    //     ],
    //   },
    //   {
    //     value: '4',
    //     area: "台北市區",
    //     label: '群組名稱4',
    //     threshold: [
    //       { state: 1, limit_max: '74' },
    //       { state: 2, limit_max: '84' },LINEGROUPID
    //       { state: 3, limit_max: '94' },
    //     ],
    //   },
]

function Threshold() {
    const _history = useHistory()

    //是否編輯
    const [isEdit, setIsEdit] = useState(false);

    //設定select內容
    const [isDisabled, setIsDisabled] = useState(true)

    const [groupData, setGroupData] = useState(LINEGROUPID);
    const [tempSaving, setTempSaving] = useState({});
    const [selectedListGroup, setSelectedGroup] = useState(groupData[0]);
    const [isLoading, setIsLoading] = useState(true)
    const handleGroupChange = (value) => {
        // console.log("aa")
        const selectedGroup = groupData.find((group) => group.value === value);
        setSelectedGroup(selectedGroup);
        // console.log(selectedGroup)
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

    const handleInputChange = (e, index) => {
        // console.log(tempSaving)
        const value = e.target.value;
        const newthreshold = [...editedThresholds.threshold]
        newthreshold[index].limit_max = value
        setEditedThresholds(
            (prev) => {
                console.log(prev)
                const newThresholds = { ...prev };
                // newThresholds[groupId][index].limit_max = value;
                newThresholds.threshold[index].limit_max = Number(value)
                return newThresholds;
            }
            // {...editedThresholds,threshold: [...newthreshold]}
        );
    };

    const handleSave = () => {
        setIsLoading(true)
        // console.log("save", groupId, editedThresholds[groupId]);
        // const newGroupData = groupData.map((item) => {
        //     if (item.value === groupId) {
        //         return {
        //             ...item,
        //             threshold: editedThresholds[groupId],
        //         };
        //     }
        //     return item;
        // });
        // setGroupData(newGroupData);
        // const selectedGroup = newGroupData.find((group) => group.value === groupId);
        // setSelectedGroup(selectedGroup);
        // console.log("newGroupData", newGroupData, groupData, editedThresholds[groupId], selectedGroup);
        // console.log(editedThresholds)
        postRegionThreshold({
            region_id: editedThresholds.value,
            limit_high: editedThresholds.threshold[2].limit_max,
            limit_moderate: editedThresholds.threshold[1].limit_max,
            limit_low: editedThresholds.threshold[0].limit_max
        }).then((data) => {
            if (data.errStatus) {
                console.log(data.errDetail);
            } else {
                setIsLoading(false)
            }
        })
        setIsEdit(false);
    };
    function setRegionName(region_data, el) {

        const data = region_data.find((rel) => rel.region_id == el.region_id)
        return data.region_name
        // let region_name=""



    }
    // const region_id_list = [
    //     '台北市區', '台北市區', '台北市區', '台北市區', '台北市區', '台北市區', '台北市區', '台北市區', '新北市區', '桃園市區', '新竹市區', '苗栗市區', '台中市區', '南投市區', '彰化市區', '雲林市區', '嘉義市區', '台南市區', '高雄市區', '屏東市區', '台東市區', '花蓮市區', '宜蘭市區', '基隆市區'
    // ]
    useEffect(() => {
        getAllThreshold().then((data) => {
            if (data?.errStatus) {
                console.log(data.errDetail);
            } else {

                getAllRegions().then((region_data) => {
                    if (region_data.errStatus) {
                        console.log(region_data.errDetail);
                    } else {
                        let formatedData = data.map((el) => {
                            console.log(el.region_id)
                            return {
                                value: el.region_id, //區處別
                                // area: region_id_list[Number(el.region_id)],
                                area: setRegionName(region_data, el),
                                // label: '群組名稱1',
                                threshold: [
                                    { state: 1, limit_max: el.limit_low },
                                    { state: 2, limit_max: el.limit_moderate },
                                    { state: 3, limit_max: el.limit_high },
                                ]
                            }
                        }
                        )
                        setGroupData(formatedData)
                        setSelectedGroup(formatedData.find((group) => group.value === userRegion));
                        if(userRole=="adm"||userRole=="ops"){
                           setIsDisabled(false) 
                        }
                        
                        setIsLoading(false)
                       
                    }
                })
                // console.log()
                // setGroupData()
            }
        })

    }, [])


    const editClicked = () => {
        setTempSaving(
            {
                area: selectedListGroup.area,
                threshold: [
                    { state: 1, limit_max: selectedListGroup.threshold[0].limit_max },
                    { state: 2, limit_max: selectedListGroup.threshold[1].limit_max },
                    { state: 3, limit_max: selectedListGroup.threshold[2].limit_max },
                ],
                value: selectedListGroup.value
            }
        )
        setEditedThresholds({ ...selectedListGroup })
        setIsEdit(true)

    }
    //刪除群組Confirm
    const showCancel = () => {
        // confirm({
        //     title: '刪除群組',
        //     icon: <ExclamationCircleOutlined />,
        //     content: '確定刪除這個群組資料？',
        //     onOk: () => handleOk(groupId),
        //     //   onCancel: () => handleCancel(),
        //     okText: "刪除",
        //     cancelText: "取消",
        //     okButtonProps: {
        //         danger: true,
        //     }
        // });
        // setIsModalOpen(true);
        // setSelectedGroup(selectedListGroup)

        setEditedThresholds({ ...selectedListGroup })
        setIsEdit(false)
        // console.log(tempSaving)
        setSelectedGroup({ ...tempSaving })
    };
    const handleOk = (groupId) => {
        handleDelete(groupId)
        setIsEdit(false);
    };
    // const handleCancel = () => {
    //     setIsEdit(false);
    // };

    //實現刪除
    const handleDelete = async (groupId) => {
        const newGroup = groupData.filter((group) => group.value !== groupId);
        setGroupData(newGroup);
        setSelectedGroup(newGroup[0]);
        // console.log("delete", newGroup, groupId, groupData, selectedListGroup)
    }

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

    //下拉搜尋
    const onSearch = (value) => {
        console.log('search:', value);
    };

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
                    <div class=" p-10 text-normal">
                        <span class="font-bold">區處：</span>
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
                                style={{ width: 200, fontSize: '16px' }}
                                onChange={handleGroupChange}
                                disabled
                            >
                                {groupData.map((group) => (
                                    <Option key={group.value} value={group.value}>
                                        {group.area}
                                    </Option>
                                ))}
                            </Select>
                            :
                            <Select
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            defaultValue={region_list.find(el => el.region_id == userRegion).region_name}
                            style={{ width: 200, fontSize: '16px' }}
                            disabled={isLoading || isDisabled}
                            onChange={handleGroupChange}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                (option?.area ?? '').includes(input)
                            }
                        >
                            {groupData.map((group) => (
                                <Option key={group.value} value={group.value} area={group.area} class='select-search-input'>
                                    {group.area}
                                </Option>
                            ))}
                        </Select>
                        }
                    </div>
                    {
                        isLoading ?
                            <div>
                                <Spin tip="載入中" size="large">
                                    <div className="content" />
                                </Spin>
                            </div>
                            :
                            <div class=" px-10 pb-10 flex justify-between">
                                <div class="flex text-normal">
                                    <span class="font-bold">警告門檻：</span>
                                    {/* 修改  */}
                                    {
                                        isEdit ?
                                            <div class="flex">
                                                <div>
                                                    {editedThresholds.threshold.map((item, index) => (
                                                        <div key={item.state} className="flex">
                                                            <div className="flex row text-normal">
                                                                <p className={`mr-2 ${item.state === 1 ? 'normal-style' : (item.state === 2 ? 'medium-style' : 'heavy-style')}`}>
                                                                    {item.state === 1 && '一般'}
                                                                    {item.state === 2 && '中度'}
                                                                    {item.state === 3 && '重度'}
                                                                </p>
                                                                <p className="mr-2">警告門檻：高於 </p>
                                                                <p className="w-16 mr-2 text-normal">
                                                                    <Input
                                                                        // style={{fontSize:'16px'}}
                                                                        value={item.limit_max}
                                                                        onChange={(e) => handleInputChange(e, index)}
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
                                                    {selectedListGroup.threshold.map((item) => (
                                                        <div key={item.state} className="flex text-normal">
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
                                        <button class="btn-manage justify-self-end mr-4 text-normal" onClick={() => showCancel()}>取消</button>
                                        <button class="btn-manage justify-self-end mr-4 btn-manage-full text-normal" onClick={() => handleSave()}>儲存</button>
                                    </div>
                                    :
                                    isLoading||userRole=="ove"||userRole =="usr" ?
                                        <></>
                                        :
                                        <div class="flex2">
                                            <button class="btn-manage justify-self-end  mr-4 btn-manage-full text-normal" onClick={editClicked} >編輯</button>
                                        </div>
                                }


                            </div>
                    }


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
