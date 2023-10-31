//antd
import { Divider, Layout } from 'antd';
import RemitForm from '../../components/manage/RemitForm'

const { Header, Footer, Content } = Layout;


function transformerRemit() {

  return (
    <Layout class="h-screen px-20 py-12 manage-wrapper bg-gray-100">
      <Header class="pt-4 pb-8 flex space-x-7 items-center">
        <h2 class="flex-auto font-bold text-2xl">變壓器匯出</h2>
   
      </Header>
      <Content class="h-08 bg-white">
          <Content class="h-08 px-14 py-12">
            <RemitForm  />
          </Content>
          <Divider />
         
      </Content>
    </Layout>
  );

}
export default transformerRemit;
