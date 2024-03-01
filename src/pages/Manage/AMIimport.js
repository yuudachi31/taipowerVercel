// 匯入AMI頁面
//antd
import { Divider, Layout, Input } from 'antd';
import { DownOutlined, SearchOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Dropdown, Space, Button, Select, Modal, Popconfirm } from 'antd';
import { useState } from 'react';
import { postUploadLpi, postUploadDMQSCustomer, postUploadDMQSTransformer, postUploadNBS } from '../../api/frontApi';
import { Pagination } from 'antd';
import { useHistory } from 'react-router-dom';
import './manage.css'
import ErrorModal from '../../components/ErrorModal'
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
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorStatus, setErrorStatus] = useState(200);
    const [isEdit, setIsEdit] = useState(false);
    const handleDelete = async () => {
        console.log("delete")
    }
    const handleSave = () => {
        console.log("save")
        setIsEdit(false)
    }
    const onClickGetDMQSCustomer = () => {
        // getDMQSCustomer().then((data)=>{
        //     if(data.errStatus){

        //     }else{
        //         console.log(data)
        //     }
        // })


    }
    const handleNBSFileUpload = () => {
        let file = document.querySelector("[name=file-nbs]").files[0];
        let formData = new FormData();
        //https://stackoverflow.com/questions/62888805/how-can-i-pass-my-csv-file-as-form-data-using-rest-api
        formData.append('file', file)
        console.log(formData)
        // postUploadNBS(formData)
        // console.log(formData)
    }
    const handleMDMSFileUpload = () => {
        let file = document.querySelector("[name=file-mdms]").files[0];
        let formData = new FormData();
        //https://stackoverflow.com/questions/62888805/how-can-i-pass-my-csv-file-as-form-data-using-rest-api
        formData.append('file', file)
        console.log(formData)
        // postUploadNBS(formData)
        // console.log(formData)
    }
    const handleDMQSCustFileUpload = () => {
        let file = document.querySelector("[name=file-dmqscust]").files[0];
        let formData = new FormData();
        //https://stackoverflow.com/questions/62888805/how-can-i-pass-my-csv-file-as-form-data-using-rest-api
        formData.append('file', file)
        console.log(formData)
        // postUploadNBS(formData)
        // console.log(formData)
    }
    const handleDMQSTransFileUpload = () => {
        let file = document.querySelector("[name=file-dmqstrans]").files[0];
        let formData = new FormData();
        //https://stackoverflow.com/questions/62888805/how-can-i-pass-my-csv-file-as-form-data-using-rest-api
        formData.append('file', file)
        console.log(formData)
        // postUploadNBS(formData)
        // console.log(formData)
    }
    


    return (
        <Layout class="px-20 py-12 manage-wrapper bg-gray-100 minHeight">
            <Header class="pt-4 pb-8 flex space-x-7 items-center">
                <h2 class="flex-auto font-bold text-2xl">資料匯入</h2>
            </Header>
            {/* <ErrorModal 
         setIsErrorModalOpen={setIsErrorModalOpen}
         isErrorModalOpen={isErrorModalOpen}
         errStatus={errorStatus}
         
         ></ErrorModal> */}
            <Content class="flex h-08 bg-white" style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <div class="flex p-10 text-normal ">
                    <label for="upload-nbs" id="upload-nbs-label">

                        <div class="btn-manage justify-self-end mr-4 pos-r" ><input type="file"
                            accept={[".csv.gz", ".csv"]}
                            id="upload-nbs"
                            onChange={(e) => {
                                handleNBSFileUpload();
                            }}
                            name="file-nbs" />NBS </div>

                    </label>
                    <label for="upload-mdms" >

                        <div class="btn-manage justify-self-end mr-4 pos-r" ><input type="file"
                            accept={[".csv.gz", ".csv"]}
                            id="upload-mdms"
                            onChange={(e) => {
                                handleMDMSFileUpload();
                            }}
                            name="file-mdms" />MDMS </div>

                    </label>
                    <label for="upload-dmqscust" >

                        <div class="btn-manage justify-self-end mr-4 pos-r" ><input type="file"
                            accept={[".csv.gz", ".csv"]}
                            id="upload-dmqscust"
                            onChange={(e) => {
                                handleDMQSCustFileUpload();
                            }}
                            name="file-dmqscust" />DMQS用戶資料查詢 </div>

                    </label>
                    <label for="upload-dmqstrans" >

                        <div class="btn-manage justify-self-end mr-4 pos-r" ><input type="file"
                            accept={[".csv.gz", ".csv"]}
                            id="upload-dmqstrans"
                            onChange={(e) => {
                                handleDMQSTransFileUpload();
                            }}
                            name="file-dmqstrans" />DMQS變壓器查詢 </div>

                    </label>
                    {/* <button class="btn-manage justify-self-end mr-4" >NBS</button> */}
                    {/* <button class="btn-manage justify-self-end mr-4" >MDMS</button> */}
                    {/* <button class="btn-manage justify-self-end mr-4" >DMQS用戶資料查詢</button> */}
                    {/* <button class="btn-manage justify-self-end mr-4" >DMQS變壓器查詢</button> */}
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

