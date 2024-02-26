// 匯入AMI頁面
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

function AMIimport() {
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
        <Layout class="h-screen px-20 py-12 manage-wrapper bg-gray-100">
                <Header class="pt-4 pb-8 flex space-x-7 items-center">
                    <h2 class="flex-auto font-bold text-2xl">資料匯入</h2>

                </Header>
                <Content class="h-08 bg-white">
                    <Content class="h-08 px-14 py-12">
                        <div class="flex">
                            <button class="btn-manage justify-self-end mr-4" >NBS</button>

                            <button class="btn-manage justify-self-end mr-4" >MDMS</button>
        
                            <button class="btn-manage justify-self-end mr-4" >DMQS用戶資料查詢</button>
        
                            <button class="btn-manage justify-self-end mr-4" >DMQS變壓器查詢</button>
                        </div>
                    </Content>
                    <Divider />
                    <div className="remitBotton">
                        <button class="btn-manage justify-self-end mr-4 btn-manage-full " >計算</button>
                    </div>
                </Content>
           
        </Layout>
    );

}
export default AMIimport;

