//閥值管理
//antd
import { Divider, Layout, Input } from 'antd';
import { DownOutlined, SearchOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Dropdown, Space, Button, Select, Modal, Popconfirm } from 'antd';
import { useState } from 'react';
import { Pagination } from 'antd';
import { useHistory } from 'react-router-dom';
import './manage.css'

const { Header, Content } = Layout;
const { Search } = Input


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
        label: '群組名稱1',
    },
    {
        value: '2',
        label: '群組名稱2',
    },
    {
        value: '3',
        label: '群組名稱3',
    },
    {
        value: '4',
        label: '群組名稱4',
    },
]

function Threshold() {
    const _history = useHistory()

    //是否編輯
    const [isEdit, setIsEdit] = useState(false);
    const handleDelete = async () => {
        console.log("delete")
    }
    const handleSave = () => {
        console.log("save")
        setIsEdit(false)
    }

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
                        <Select
                            defaultValue="1"
                            style={{
                                width: 120,
                            }}
                            // onChange={handleChange}
                            options={LINEGROUPID}
                        />
                    </div>
                    <div class=" px-10 pb-10 flex justify-between">
                        <div class="flex">
                            <span class="font-bold">警告門檻：</span>
                            {/* 修改  */}
                            {isEdit ? 
                                <div class="flex">
                                    <div>
                                    <div  class="flex row ">
                                        <div class="flex mb-3"><p class="mr-2">一般 警告門檻：高於 </p><div class=" w-16 mr-2"><Input /></div><p class="mr-2" > %</p></div>
                                        {/* <div class="flex mb-3"><p class="mr-2">低於</p><div class=" w-16 mr-2"><Input /></div><p> %</p></div> */}
                                    </div>
                                    <div  class="flex row">
                                        <div class="flex mb-3"><p class="mr-2">中度 警告門檻：高於 </p><div class=" w-16 mr-2"><Input /></div><p class="mr-2"> %</p></div>
                                        {/* <div class="flex mb-3"><p class="mr-2">低於</p><div class=" w-16 mr-2 "><Input /></div><p> %</p></div> */}
                                    </div>
                                    <div  class="flex row">
                                        <div class="flex mb-3"><p class="mr-2">重度 警告門檻：高於 </p><div class=" w-16 mr-2"><Input /></div><p> %</p></div>
                                        {/* <div class="flex mb-3"><p class="mr-2">高於</p><div class=" w-16 mr-2 "><Input /></div><p> %</p></div> */}
                                    </div>
                                    </div>
                                </div>
                                :
                                //修改完後的顯示
                                <div class="flex">
                                    <div>
                                        <div  class="flex row ">
                                            <div class="flex mb-3"><p class="mr-2">一般 警告門檻：高於 </p><p class="mr-2"> 70%</p></div>
                                            {/* <div class="flex mb-3"><p class="mr-2">低於</p><p> 80%</p></div> */}
                                        </div>
                                        <div  class="flex row">
                                            <div class="flex mb-3"><p class="mr-2">中度 警告門檻：高於 </p><p class="mr-2"> 80%</p></div>
                                            {/* <div class="flex mb-3"><p class="mr-2">低於</p><p> 90%</p></div> */}
                                        </div>
                                        <div  class="flex row">
                                            <div class="flex mb-3"><p class="mr-2">重度 警告門檻：高於 </p><p> 90%</p></div>
                                            {/* <div class="flex mb-3"><p class="mr-2">高於</p><div class=" w-16 mr-2 "><Input /></div><p> %</p></div> */}
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                        {isEdit ?
                            <div class="flex2">
                                <button class="btn-manage justify-self-end mr-4 btn-manage-full" >刪除群組</button>
                                <button class="btn-manage justify-self-end mr-4 btn-manage-full" onClick={handleSave}>儲存</button>
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
