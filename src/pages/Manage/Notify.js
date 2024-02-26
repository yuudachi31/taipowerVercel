//推播管理
//antd


import { Dropdown, Space, Button, Select, Modal, Popconfirm,message } from 'antd';
import { Divider, Layout, Input, Table, Spin } from 'antd';
import { DownOutlined, SearchOutlined, CheckCircleFilled, CloseCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';

import { useState, useEffect } from 'react';
import { getAllThreshold, getAllRegions, getAllUser,postEventbyID , getAbnormalTransList, postEmailNotify } from '../../api/frontApi'
import { saveAbnormalTransData } from '../../actions/transformer';

import { connect } from "react-redux";

// import { Pagination } from 'antd';
import { useHistory } from 'react-router-dom';
import './manage.css'
const { Header, Content } = Layout;
const { Search } = Input
const { Option } = Select;
const { confirm } = Modal;

export const USER_DATA = [
    {
        value: ['00'],
        area: ['台北市區'],
        name: 'User_001',
        // group: ['區處管理者', '運維人員'],
        // email: 'user1@gmail.com',
        line_state: true,
        email_state: true,
    },
    {
        value: ['00'],
        area: ['台北市區', '高雄市區'],
        name: 'User_002',
        // group: ['運維人員'],
        // email: 'user2@gmail.com',
        line_state: true,
        email_state: false
    },
    {
        value: ['01'],
        area: ['台北市區', '新竹市區', '高雄市區'],
        name: 'User_003',
        // group: ['區處檢修人員'],
        // email: 'user3@gmail.com',
        line_state: false,
        email_state: true,
    },
    {
        value: ['02'],
        area: ['台北市區', '新北市區'],
        name: 'User_004',
        // group: ['區處管理者', '運維人員'],
        // email: 'user4@gmail.com',
        line_state: true,
        email_state: true,
    },
    {
        value: ['03'],
        area: ['台北市區', '高雄市區'],
        name: 'User_005',
        // group: ['運維人員'],
        // email: 'user5@gmail.com',
        line_state: true,
        email_state: true,
    },
    {
        value: ['04'],
        area: ['台北市區', '新竹市區', '新北市區'],
        name: 'User_006',
        // group: ['區處檢修人員'],
        // email: 'user6@gmail.com',
        line_state: false,
        email_state: false,
    },
    {
        value: ['01'],
        area: ['台北市區'],
        name: 'User_007',
        // group: ['區處管理者', '運維人員'],
        // email: 'user1@gmail.com',
        line_state: true,
        email_state: false,
    },
    {
        value: ['02'],
        area: ['台北市區', '高雄市區'],
        name: 'User_008',
        // group: ['運維人員'],
        // email: 'user2@gmail.com',
        line_state: true,
        email_state: true,
    },
    {
        value: ['01'],
        area: ['台北市區', '新竹市區', '高雄市區'],
        name: 'User_009',
        // group: ['區處檢修人員'],
        // email: 'user3@gmail.com',
        line_state: false,
        email_state: true,
    },
    {
        value: ['01'],
        area: ['台北市區', '新北市區'],
        name: 'User_010',
        // group: ['區處管理者', '運維人員'],
        // email: 'user4@gmail.com',
        line_state: true,
        email_state: true,
    },
    {
        value: ['00'],
        area: ['台北市區', '高雄市區'],
        name: 'User_011',
        // group: ['運維人員'],
        // email: 'user5@gmail.com',
        line_state: true,
        email_state: false,
    },
    {
        value: ['11'],
        area: ['台北市區', '新竹市區', '新北市區'],
        name: 'User_012',
        // group: ['區處檢修人員'],
        // email: 'user6@gmail.com',
        line_state: false,
        email_state: true,
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
        area: "",
        // label: '群組名稱1',
        threshold: [
            { state: 1, limit_max: '' },
            { state: 2, limit_max: '' },
            { state: 3, limit_max: '' },
        ],
    },
    {
        value: '2',
        area: "新北市區",
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
        // label: '群組名稱4',
        threshold: [
            { state: 1, limit_max: '74' },
            { state: 2, limit_max: '84' },
            { state: 3, limit_max: '94' },
        ],
    },
]

function Notify({ transformer, saveAbnormalTransData }) {
    const _history = useHistory()
    //設定Select資料
    const [groupData, setGroupData] = useState(LINEGROUPID);
    const [isDisabled, setIsDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [isUserLoading, setIsUserLoading] = useState(true)
    const [selectedGroup, setSelectedGroup] = useState(groupData[0]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userData, setUserData] = useState(USER_DATA);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [abnormalTRList,setAbnormalTRList]= useState([]);
    // 切換群組時更新列表資訊
    const handleGroupChange = (value) => {
        const selectedGroup = groupData.find((group) => group.value === value);
        setSelectedGroup(selectedGroup);

        // 過濾符合條件的帳號
        // const usersInGroup = userData.filter((user) => user.region_id.includes(selectedGroup.value));
        const usersInGroup = userData.filter((user) => user.region_id == selectedGroup.value);
        setFilteredUsers(usersInGroup);
    };

    useEffect(() => {
        getAllUser().then((data) => {
            if (data?.errStatus) {
                console.log(data.errDetail);
            } else {
                console.log(data)
                setUserData(data)
                setIsUserLoading(false)
            }
        })
        getAbnormalTransList().then((abnData) => {
            if (abnData.errStatus) {
                console.log(abnData.errDetail);
            } else {
                saveAbnormalTransData(abnData)
                // setIsDisabled(false)
                setIsLoading(false)

            }
        })
        getAllThreshold().then((data) => {
            if (data.errStatus) {
                console.log(data.errDetail);
            } else {

                getAllRegions().then((region_data) => {
                    if (region_data.errStatus) {
                        console.log(region_data.errDetail);
                    } else {

                        setGroupData(data.map((el) => {
                            // console.log(el.region_id)
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


                        ))


                        setIsDisabled(false)
                    }
                })
                // console.log()
                // setGroupData()
            }
        })
        // 在組件初始化時進行一次過濾
        const initialUsersInGroup = userData.filter((user) => user.area.includes(groupData[0].area));
        setFilteredUsers(initialUsersInGroup);
       
        getAbnormalTransList().then((data) => {
            if (data.errStatus) {
                message.error(data.errDetail);
            } else {
                // console.log(data)
                console.log(data)
                setAbnormalTRList(data)
                // pushData()
                console.log("saveall")
            }
        })
    }, []);
    function setRegionName(region_data, el) {

        const data = region_data.find((rel) => rel.region_id == el.region_id)
        return data.region_name
        // let region_name=""



    }
    //設定table欄位
    const columns = [
        {
            title: () => { return <div class='font-medium text-base'>帳號</div> },
            dataIndex: 'user_id',
            key: 'user_id',
        },
        // {
        //     title: ()=>{return <div class='font-medium text-base'>電子信箱連接狀態</div> },
        //     dataIndex: 'email_state',
        //     key: 'email_state',
        //     render: (record) => (
        //         <div>
        //             {record ?
        //                 <CheckCircleFilled style={{ fontSize: '20px', color: '#7ACA00' }} />
        //                 :
        //                 <CloseCircleFilled style={{ fontSize: '20px', color: '#F66C55' }} />
        //             }
        //         </div>
        //     )
        // },
        // {
        //     title: ()=>{return <div class='font-medium text-base'>LINE 連接狀態</div> },
        //     dataIndex: 'line_state',
        //     key: 'line_state',
        //     render: (record) => (
        //         <div>
        //             {record ?
        //                 <CheckCircleFilled style={{ fontSize: '20px', color: '#7ACA00' }} />
        //                 :
        //                 <CloseCircleFilled style={{ fontSize: '20px', color: '#F66C55' }} />
        //             }
        //         </div>
        //     )
        // },
        // {
        //     title: () => { return <button class="text-purple-400 font-bold text-3xl" onClick={showadduserModal}>+</button> },
        //     key: 'action',
        //     align: 'right',
        //     render: (text, record) => (
        //         <button className="btn-manage" style={{ display: 'inline' }} onClick={() => showConfirm(record.user_id)}>
        //             移除
        //         </button>
        //     ),
        // },
    ];

    //當切換成不同群組時將列表切回第一頁
    const [currentPage, setCurrentPage] = useState(1);
    const [isMailLoading,setIsMailLoading ] = useState(false);
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
    const sendMailModal =()=>{
        Modal.confirm({
            icon:<ExclamationCircleOutlined/>,
            title: '推播確認',
            content: '確定要進行Email推播嗎？',
            okText: '是',
            cancelText: '否',
            onOk: sendMail

        });
    }
    const sendMail = () => {
        setIsMailLoading(true)
        // console.log(selectedGroup)
        // console.log(filteredUsers)
        if (filteredUsers.length > 0) {
            let emailArr = filteredUsers.map((el) => el.email)
            console.log(`[${emailArr.toString()}]`)
            console.log(transformer)
            console.log(`  <table>
            <tr>
                <th>圖號座標   </th>
                <th>組別   </th>
                <th>第幾具</th>
                <th>利用率</th>
                <th>危險等級</th>
            </tr>
                    ${
                        transformer.ABNtransformerList.map((el) => {
                         return  "<tr>"+
                                `<td>${el.coor[0]}</td>
                                <td>${el.div}</td>
                                <td>${el.tr_index}${el.tr_index=="NA"?"":"/"+el.num}</td>
                                <td>${el.uti_rate}</td>
                                <td>${el.danger_lv[0]}</td>`
                            +"</tr>"
                        })

                    }  </table>`)
            postEmailNotify({
                // emails: `[${emailArr.toString()}]`,
                emails:"['yuudachi31@zcjh.ntpc.edu.tw']",
                subject: "變壓器異常通知",
                content:`  <table style=' font-size:20px;'>
                <tr >
                    <th style=' border-right:solid #c9c6c5 1px;background-color:#eefcca;'>圖號座標   </th>
                    <th style=' border-right:solid #c9c6c5 1px;background-color:#eefcca;'>組別  </th>
                    <th style=' border-right:solid #c9c6c5 1px;background-color:#eefcca;padding:0 10px;'>第幾具</th>
                    <th style=' border-right:solid #c9c6c5 1px;background-color:#eefcca;padding:0 10px;'>利用率</th>
                   
                </tr>
                        ${
                            transformer.ABNtransformerList.map((el,index) => {
                                if(index%2==0){
                                    return  "<tr style='text-align:center;'>"+
                                    `<td style='padding:0 10px;'>${el.coor[0]}</td>
                                    <td style='background-color:#d0fca4; padding:0 10px;'>${el.div}</td>
                                    <td>${el.tr_index}${el.tr_index=="NA"?"":"/"+el.num}</td>
                                    <td style='background-color:#d0fca4;'>${el.uti_rate}</td>
                                   `
                                +"</tr>"
                                }else{
                                    return  "<tr style='text-align:center; font-size:20px;'>"+
                                    `<td style='background-color:#d0fca4;padding:0 10px;'>${el.coor[0]}</td>
                                    <td style='padding:0 10px;'>${el.div}</td>
                                    <td style='background-color:#d0fca4;'>${el.tr_index}${el.tr_index=="NA"?"":"/"+el.num}</td>
                                    <td '>${el.uti_rate}</td>
                                  `
                                +"</tr>"
                                }
                             
                            }).join('')
    
                        }  </table>`

                  
            }).then((data)=>{
                if(data.status==200){
                    setIsMailLoading(false)
                    message.success("發送成功!")
                }else{
                    setIsMailLoading(false)
                    message.error("發送失敗");
                console.error("Login failed:", data);
                }
            }).catch((error) => {
                // 處理其他錯誤，例如網絡錯誤等
                setIsMailLoading(false)
                message.error("發送失敗");
                console.error("Login failed:", error);
                
              });
        }



        // filteredUsers
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
            okButtonProps: {
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
                user.region_id = user.region_id.filter((groupLabel) => groupLabel !== selectedGroup.area);
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
        const existingUser = userData.find((user) => user.user_id === newAccountName);

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
                existingUser.region_id.push(selectedGroup.area);
                // setModalContent(
                // <p className="text-green-500">
                //     *帳號成功添加到此群組。
                // </p>
                // );
                setNewAccountName('');
                setModalContent(null);
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
    const channel_id="U15f78caf74ae1efbf7f593a8e9e7f9e8"
    //line 推播
    function showlineConfirm() {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '確定要進行Line推播嗎？',
            onOk() {
                console.log(abnormalTRList);
                console.log('OK');
                setIsModalVisible(false);
                _handleSend(channel_id);
            },
            onCancel() {
                console.log('Cancel');
            },
            okText: '確定',
            cancelText: '取消',
            
        });
        
    }
    const _handleSend = async (channel_id) => {
        console.log(`事件`)
        // const dis = _district.join('_')
        const send = await postEventbyID(channel_id,abnormalTRList);
        if (send) {
            success();
        } else {
            message.error(`推播錯誤`)
        }
    }
    function success() {
        Modal.success({
            content: '推播成功！',

        });
        return (
            <div className="w-12 h-12 bg-black"></div>
        );

    }
    const handleCancel_adduser = () => {
        // 重置輸入的值、提示信息，並禁用 OK 按鈕
        // setNewAccountName('');
        setModalContent(null);
        setIsadduserModalOpen(false);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    return (
        <Layout class="px-20 py-12 manage-wrapper bg-gray-100 minHeight">
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
                    <div class=" p-10 text-normal">
                        <span class="font-bold">推播區處：</span>
                        <Select
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            defaultValue={groupData[0].value}
                            style={{ width: 200, fontSize:'16px'}}
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
                    </div>
                    {
                        isLoading || isDisabled ?
                            <div>
                                <Spin tip="載入中" size="large">
                                    <div className="content" />
                                </Spin>
                            </div>
                            :
                            <div class=" px-10 pb-10 flex justify-between">
                                <div class="flex text-normal">
                                    <span class="font-bold">警告門檻：</span>
                                    <div>
                                        {/* <div  class="flex row "> */}
                                        {selectedGroup.threshold.map((item) => (
                                            <div key={item.state} className="flex">
                                                <div class="flex row text-normal">
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
                            <Modal title="確認推播" visible={isModalVisible} >
                            </Modal>
                            <div class="flex2">
                            <button class={`btn-manage justify-self-end mr-4 ${isMailLoading?'':'btn-manage-full'}`} onClick={sendMailModal} disabled={isMailLoading} >電子信箱推播</button>
                                    <button class="btn-manage justify-self-end mr-4 btn-manage-full" onClick={showlineConfirm} >LINE 推播</button>
                            </div>
                        </div>

                    //     <Modal title="確認推播" visible={isModalVisible} >
                    //             </Modal>
                    //     <div class="flex2">
                                
                    //             <button class="btn-manage justify-self-end mr-4 btn-manage-full" >電子信箱推播</button>
                    //             <button class="btn-manage justify-self-end mr-4 btn-manage-full" onClick={showlineConfirm} >LINE 推播</button>
                    //     </div>
                    
                    // </div>
                    


                            //     </div>
                            //     <div class="flex2 text-normal">
                                
                            //         <button class={`btn-manage justify-self-end mr-4 ${isMailLoading?'':'btn-manage-full'}`} onClick={sendMailModal} disabled={isMailLoading} >電子信箱推播</button>
                                
                            //         <button class="btn-manage justify-self-end mr-4 btn-manage-full">LINE 推播</button>
                            //     </div>
                            // </div>
                    }

                </Content>
            </Content>
            <div class="my-7 font-bold text-base">推播帳號列表</div>
            {
                isLoading || isDisabled || isUserLoading ? <></>
                    :
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
                        {/* <table>
                <tr>
                    <th>圖號座標</th>
                    <th>組別</th>
                    <th>第幾具</th>
                    <th>利用率</th>
                    <th>危險等級</th>
                </tr>
                        
                        {  transformer.ABNtransformerList.map((el) => {
                             return  <tr>
                                    <td>{el.coor[0]}</td>
                                    <td>{el.div}</td>
                                    <td>{el.tr_index}{el.tr_index=="NA"?"":"/"+el.num}</td>
                                    <td>{el.uti_rate}</td>
                                    <td>{el.danger_lv[0]}</td>
                                </tr>
                            })
    
                        }  </table> */}
                            </Content>
                        </Layout>
                    </Content>
            }
        </Layout>
    );

}
const mapStateToProps = ({ transformerReducer }) => ({
    transformer: transformerReducer,
});

const mapDispatchToProps = {
    saveAbnormalTransData
};
export default connect(mapStateToProps, mapDispatchToProps)(Notify);
// export default Notify;

function UserItem({ user }) {
    const _history = useHistory()

    return (
        <>
            <div class="user-grid-row pt-1 account-list">
                <div>{user.user_id}</div>
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
