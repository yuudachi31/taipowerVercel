import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
import { BellOutlined, ToolOutlined } from '@ant-design/icons';
import './ant.css'

import UserList from "./UserList";
import CreateUser from "./CreateUser";
import UserInfo from "./UserInfo";
import Menu from "../../components/manage/ManageMenu"

const MENU_DATA = [
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
    }
]


function Manage() {
    return (
        <BrowserRouter>
            <Layout id="manage" class="bg-gray-100">
                <Switch>
                    <Route path="/manage/notify">
                        <Menu data={MENU_DATA} menuActive={'notify'} />
                    </Route>
                    {/* user */}
                    <Route exact path="/manage/user/create">
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