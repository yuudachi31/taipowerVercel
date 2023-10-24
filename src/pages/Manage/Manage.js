import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
import { BellOutlined, ToolOutlined ,LineChartOutlined} from '@ant-design/icons';
import './ant.css'

import UserList from "./UserList";
import CreateUser from "./CreateUser";
import UserInfo from "./UserInfo";
import Notify from "./Notify";
import Threshold from "./Threshold";
import Menu from "../../components/manage/ManageMenu"

const MENU_DATA = [
    {
        route: '/manage/threshold',
        title: '閥值管理',
        name: 'threshold',
        icon: <LineChartOutlined />
    },
    {
        route: '/manage/notify',
        title: '推播管理',
        name: 'notify',
        icon: <BellOutlined />
    },
    {
        route: '/manage/user',
        title: '帳號管理',
        name: 'user',
        icon: <ToolOutlined />
    },
   
]


function Manage() {
    return (
        <BrowserRouter>
            <Layout id="manage" class="bg-gray-100">
                <Switch>
                    {/* 閥值 */}
                    <Route exact path="/manage/threshold">
                        <Menu data={MENU_DATA} menuActive={'threshold'} />
                        <Threshold />
                    </Route>
                    <Route path="/manage/notify">
                        <Menu data={MENU_DATA} menuActive={'notify'} />
                        <Notify/>
                    </Route>
                    {/* user */}
                    <Route path="/manage/user/create">
                        <Menu data={MENU_DATA} menuActive={'user'} />
                        <CreateUser />
                    </Route>
                    <Route path="/manage/user/:user_id">
                        <Menu data={MENU_DATA} menuActive={'user'} />
                        <UserInfo />
                    </Route>
                    <Route path="/manage/user">
                        <Menu data={MENU_DATA} menuActive={'user'} />
                        <UserList />
                    </Route>
                     
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default Manage;
