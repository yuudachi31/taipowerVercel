// 匯入AMI頁面
//antd
import { Divider, Layout, Input } from 'antd';
import Industry from '../../components/manage/Industry'
import { DownOutlined, SearchOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Dropdown, Space, Button, Select, Modal, Popconfirm } from 'antd';
import { useState } from 'react';
import { Pagination } from 'antd';
import { useHistory } from 'react-router-dom';
import { postIndustry } from '../../api/frontApi'
import './manage.css'

const { Header, Content } = Layout;
const { Search } = Input
const FALSE = false
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
const base64str=['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']
function TransformerImport() {
    const [isLoading, setIsLoading] = useState(false)

    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedRegion, setSelectedRegion] = useState(null)
    const [isComputing, setIsComputing] = useState(false)
    const [industryData, setIndustryData] = useState(null)
    const handleSaveImage = (strArray, index) => {
        strArray?.forEach(element => {
            const downloadLink = document.createElement('a');
            downloadLink.href = `data:image/png;base64,${element}`
            downloadLink.download = `image_${index + 1}.png`
            downloadLink.click();
        });

    }

  
    const handleExport = () => {
        setIsComputing(true)
        setIsLoading(true)
       
            postIndustry(selectedDate,selectedRegion).then((data)=>{
                // setIndustryData(data)
                handleSaveImage(data)
                setIsLoading(false)
                setIsComputing(false)
            }

        )
       
        ////demo
        // setTimeout(()=>{testLoading()},3000)
        // function testLoading(){
        //     handleSaveImage(base64str)
        //     setIsComputing(false)
        //     setIsLoading(false)
        // }
    /////


        //    console.log(selectedDate,selectedRegion)
        // setIsLoading(false)

    }

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
            {/* <Header class="pt-4 pb-8 flex space-x-7 items-center">
                <h2 class="flex-auto font-bold text-2xl">變壓器匯入</h2>
            </Header>
            <Content class="h-08 bg-white">
                <Content class="h-08 px-14 py-12">
                    <Industry  />
                </Content>
                <Divider />
                <div className="remitBotton">
                    <button class="btn-manage justify-self-end mr-4 btn-manage-full " >匯出</button>
                </div>
            </Content> */}
            <Header class="pt-4 pb-8 flex space-x-7 items-center">
                <h2 class="flex-auto font-bold text-2xl">行業別匯出</h2>
            </Header>
            <Content class="flex h-08 bg-white" style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <div class="flex p-10 ">
                    <Industry setSelectedDate={setSelectedDate} setSelectedRegion={setSelectedRegion} />
                </div>
                <div>
                    <Divider />
                    <div className="remitBotton pr-10 pb-7" >
                        {/* <button class="btn-manage justify-self-end btn-manage-full  text-normal" onClick={exportClick} >匯出</button>
                             */}
                        <button class={` justify-self-end  text-normal ${(!selectedDate || !selectedRegion) || isLoading ? "btn-manage btn-disable" : "btn-manage btn-manage-full"}`} disabled={(!selectedDate || !selectedRegion) || isLoading} onClick={handleExport}>{isComputing?'計算中...':'匯出'}</button>

                    </div>
                </div>
            </Content>
        </Layout>
    );

}
export default TransformerImport;

