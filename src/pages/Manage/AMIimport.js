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

    return (
        <Layout class="px-20 py-12 manage-wrapper bg-gray-100">
            <Content>
                <Header class="pt-4 pb-8 flex space-x-7 items-center">
                    <h2 class="flex-auto font-bold text-2xl">AMI匯入</h2>

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
                                        <div class="flex mb-3"><p class="mr-2">低於</p><div class=" w-16 mr-2"><Input /></div><p> %</p></div>
                                    </div>
                                    <div  class="flex row">
                                        <div class="flex mb-3"><p class="mr-2">中度 警告門檻：高於 </p><div class=" w-16 mr-2"><Input /></div><p class="mr-2"> %</p></div>
                                        <div class="flex mb-3"><p class="mr-2">低於</p><div class=" w-16 mr-2 "><Input /></div><p> %</p></div>
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
                                            <div class="flex mb-3"><p class="mr-2">低於</p><p> 80%</p></div>
                                        </div>
                                        <div  class="flex row">
                                            <div class="flex mb-3"><p class="mr-2">中度 警告門檻：高於 </p><p class="mr-2"> 80%</p></div>
                                            <div class="flex mb-3"><p class="mr-2">低於</p><p> 90%</p></div>
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
           
        </Layout>
    );

}
export default Threshold;

