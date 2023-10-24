import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
import { BellOutlined, ToolOutlined ,LineChartOutlined} from '@ant-design/icons';
import './ant.css'

import UserList from "./UserList";
import CreateUser from "./CreateUser";
import UserInfo from "./UserInfo";
import Notify from "./Notify";
import Threshold from "./Threshold";
import AMIimport from "./AMIimport";
import transformerRemit from "./transformerRemit";
import Menu from "../../components/manage/ManageMenu2"

const MENU_DATA = [
    {
        route: '/manage2/AMIimport',
        title: 'AMI匯入',
        name: 'AMIimport',
        icon: <ToolOutlined />
    },
    {
        route: '/manage2/transformerRemit',
        title: '匯出變壓器',
        name: 'transformerRemit',
        icon: <ToolOutlined />
    },
   
]


function Manage2() {
    return (
        <BrowserRouter>
            <Layout id="manage" class="bg-gray-100">
                <Switch>
                      {/* AMI匯入 */}
                    <Route path="/manage2/AMIimport">
                        <Menu data={MENU_DATA} menuActive={'AMIimport'} />
                        <AMIimport />
                    </Route>
                    {/* 匯出變壓器 */}
                    <Route path="/manage2/transformerRemit">
                        <Menu data={MENU_DATA} menuActive={'transformerRemit'} />
                        <transformerRemit />
                    </Route>
                     
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default Manage2;
