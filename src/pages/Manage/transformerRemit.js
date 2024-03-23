//變壓器匯出頁面
//antd
import { Divider, Layout } from 'antd';
import RemitForm from '../../components/manage/RemitForm'
import './manage.css'
import { getTransformerExport } from "../../api/frontApi"
import { useState } from 'react';
const { Header, Footer, Content } = Layout;
let userRole = null

if (document.cookie?.split("; ").find((row) => row.startsWith("roles"))?.split("=")[1] != undefined) {
  userRole = JSON.parse(document.cookie?.split("; ").find((row) => row.startsWith("roles"))?.split("=")[1])[0].role_name

}


function TransformerRemit() {
  const [downloading, setDownloading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(false)


  const handleExport = () => {
    if (selectedDate) {


      setDownloading(true)
      // region_id,startdate,enddate
      getTransformerExport(selectedRegion, selectedDate[0], selectedDate[1]).then((data) => {
        console.log(data)
        const blob = new Blob([data], {
          type: 'text/csv;charset=utf-8;'
        });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'transformer.csv';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
        setDownloading(false)
      })
    }
  }

  return (
    <Layout class="px-20 py-12 manage-wrapper bg-gray-100 minHeight">
      {/* <Header class="pt-4 pb-8 flex space-x-7 items-center">
        <h2 class="flex-auto font-bold text-2xl">變壓器匯出</h2>
   
      </Header>
      <Content class="h-08 bg-white">
          <Content class="h-08 px-14 py-12">
            <RemitForm  />
          </Content>
          <Divider />
          <div className="remitBotton">
            <button class="btn-manage justify-self-end mr-4 btn-manage-full " >匯出 CSV</button>
          </div>
      </Content> */}
      <Header class="pt-4 pb-8 flex space-x-7 items-center">
        <h2 class="flex-auto font-bold text-2xl">變壓器匯出</h2>
      </Header>
        {userRole == 'usr' ?
      <Content class="flex h-08 bg-white" style={{ flexDirection: 'column',  }}>

        <div class=" p-10 f-24 "  style={{ fontSize: '24px',paddingBottom:"10px"}}>權限不足</div>
        <div class=" p-10  "  style={{ fontSize: '16px' ,color:"#ff4063",paddingTop:"0" }}>總處管理員、總處操作員、區處管理員方可操作此功能</div>
        </Content>
       : <>
      <Content class="flex h-08 bg-white" style={{ flexDirection: 'column', justifyContent: 'space-between' }}>

          <div class="flex p-10 ">
            <RemitForm setSelectedDate={setSelectedDate} setSelectedRegion={setSelectedRegion} userRole={userRole} setDownloading={setDownloading} />
          </div>
          <div>
            <Divider />
            <div className="remitBotton pr-10 pb-7" >

              <button class={` justify-self-end  text-normal ${downloading ? "btn-manage btn-disable" : "btn-manage btn-manage-full"}`} disabled={downloading} onClick={handleExport}>匯出 CSV</button>
              {/* <button class="btn-manage justify-self-end btn-manage-full  text-normal" onClick={handleExport}>匯出 CSV</button> */}
            </div>
          </div>
          
      </Content>
        </>}

    </Layout>
  );

}
export default TransformerRemit;
