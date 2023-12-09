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
const handleFileUpload = () => {
    let file = document.querySelector("[name=file]").files[0];


    // const LENGTH = 1024 * 1024 * 8;
    // let chunks = slice(file, LENGTH)
    // let fileData = [];
    // chunks.forEach((blobs) => {
    //     fileData.push(blobs)

    // })
    console.log(file)
    // const blob2 = new Blob(fileData, {
    //     type: "application/x-gzip"
    // });

    // const link = document.createElement('a');
    // link.href = window.URL.createObjectURL(blob2);
    // link.download = 'test.csv';
    // link.click();
    // window.URL.revokeObjectURL(link.href);


}
function slice(file, piece = 1024 * 1024 * 5) {
    let totalSize = file.size; // 檔案總大小
    let start = 0; // 每次上傳的開始位元組
    let end = start + piece; // 每次上傳的結尾位元組
    let chunks = []
    // console.log(file)
    while (start < totalSize) {
        // 根據長度擷取每次需要上傳的資料
        // File物件繼承自Blob物件，因此包含slice方法
        let blob = file.slice(start, end);
        chunks.push(blob)
        console.log(file)
        start = end;
        end = start + piece;
    }
    return chunks
}

function transformerImport() {
    // const _history = useHistory()

    // //是否編輯
    // const [isEdit, setIsEdit] = useState(false);
    // const handleDelete = async () => {
    //     console.log("delete")
    // }
    // const handleSave = () => {
    //     console.log("save")
    //     setIsEdit(false)
    // }

    return (
        <Layout class="px-20 py-12 manage-wrapper bg-gray-100 minHeight">
            <Content>
                <Header class="pt-4 pb-8 flex space-x-7 items-center">
                    <h2 class="flex-auto font-bold text-2xl">變壓器匯入</h2>

                </Header>
                <Content class=" bg-white">
                    <div class="p-10 flex items-center">

                        <label for="upload-user" id="upload-user-label">
                        <button class="btn-manage justify-self-end mr-4 btn-manage-full" >匯入變壓器關聯表</button>
                        </label>
                        <input type="file"
                            accept={[".csv.gz", ".csv"]}
                            id="upload-user"
                            onChange={(e) => {
                                handleFileUpload();
                            }}
                            name="file" />


                        <button class="btn-manage justify-self-end mr-4 btn-manage-full" >匯入變壓器詳細資料</button>
                    </div>

                </Content>
            </Content>

        </Layout>
    );

}
export default transformerImport;

