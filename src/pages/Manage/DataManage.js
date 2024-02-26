// 資料管理
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
import { ImportOutlined,ExportOutlined} from '@ant-design/icons';
import './ant.css'

import UserList from "./UserList";
import CreateUser from "./CreateUser";
import UserInfo from "./UserInfo";
import Notify from "./Notify";
import Threshold from "./Threshold";
import AMIimport from "./AMIimport";
import Import from "./transformerImport";
import Remit from "./transformerRemit";
import Menu from "../../components/manage/DataManageMenu"

const MENU_DATA = [
    {
        route: '/datamanage/AMIimport',
        title: '資料匯入',
        name: 'AMIimport',
        icon: <ImportOutlined />
    },
    {
        route: '/datamanage/transformerRemit',
        title: '變壓器匯出',
        name: 'transformerRemit',
        icon: <ExportOutlined />
    },
    {
        route: '/datamanage/transformerImport',
        title: '行業別匯出',
        name: 'transformerImport',
        icon: <ExportOutlined />
    },
    
   
]


function DataManage() {
    return (
        <BrowserRouter>
            <Layout id="manage" class="bg-gray-100">
                <Switch>
                    {/* AMI匯入 */}
                    <Route path="/datamanage/AMIimport">
                        <Menu data={MENU_DATA} menuActive={'AMIimport'} />
                        <AMIimport />
                    </Route>
                     {/* 變壓器匯入 */}
                     <Route path="/datamanage/transformerImport">
                        <Menu data={MENU_DATA} menuActive={'transformerImport'} />
                        <Import />
                    </Route>
                    {/* 變壓器匯出 */}
                    <Route path="/datamanage/transformerRemit">
                        <Menu data={MENU_DATA} menuActive={'transformerRemit'} />
                        <Remit />
                    </Route>
                     
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default DataManage;
