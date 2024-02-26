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
        <Layout class="px-20 py-12 manage-wrapper bg-gray-100 minHeight">
            <Header class="pt-4 pb-8 flex space-x-7 items-center">
                <h2 class="flex-auto font-bold text-2xl">資料匯入</h2>
            </Header>
            <Content class="flex h-08 bg-white" style={{ flexDirection:'column', justifyContent:'space-between'}}>
                <div class="flex p-10 text-normal">
                    <button class="btn-manage justify-self-end mr-4" >NBS</button>
                    <button class="btn-manage justify-self-end mr-4" >MDMS</button>
                    <button class="btn-manage justify-self-end mr-4" >DMQS用戶資料查詢</button>
                    <button class="btn-manage justify-self-end mr-4" >DMQS變壓器查詢</button>
                </div>
                <div>
                    <Divider />
                    <div className="remitBotton pr-10 pb-7" >
                        <button class="btn-manage justify-self-end btn-manage-full text-normal" >計算</button>
                    </div>
                </div>
            </Content>
        </Layout>
    );

}
export default AMIimport;

