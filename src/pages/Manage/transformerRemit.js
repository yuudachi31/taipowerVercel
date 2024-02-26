//變壓器匯出頁面
//antd
import { Divider, Layout } from 'antd';
import RemitForm from '../../components/manage/RemitForm'
import './manage.css'
const { Header, Footer, Content } = Layout;


function transformerRemit() {

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
      <Content class="flex h-08 bg-white" style={{ flexDirection:'column', justifyContent:'space-between'}}>
          <div class="flex p-10 ">
            <RemitForm  />
          </div>
          <div>
              <Divider />
              <div className="remitBotton pr-10 pb-7" >
                  <button class="btn-manage justify-self-end btn-manage-full  text-normal" >匯出 CSV</button>
              </div>
          </div>
      </Content>
    </Layout>
  );

}
export default transformerRemit;
