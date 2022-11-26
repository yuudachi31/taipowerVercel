
import React, { useState } from 'react';
import { useSelector } from "react-redux";


//antd
import { Layout, Menu, Dropdown, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;




function Manage() {
    const _default_key = useSelector((state)=> state.frontReducer.default_key);
    const [_item, _setItem] = useState(1);
    // username
    const _username = document.cookie.split('; ').find(row => row.startsWith('fln')).split('=')[1]


    const menu = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                  1st menu item
                </a>
              ),
            },
            {
              key: '2',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                  2nd menu item (disabled)
                </a>
              ),
              icon: <SmileOutlined />,
              disabled: true,
            },
            {
              key: '3',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                  3rd menu item (disabled)
                </a>
              ),
              disabled: true,
            },
            {
              key: '4',
              danger: true,
              label: 'a danger item',
            },
          ]}
        />
      );

    function Page() {
        if (_item === 1) {
            return (
                <div>事件列表</div>
            );
        }
        if (_item === 2) {
            return (
                <div>輸電線資訊</div>
            );
        }
        if (_item === 3) {
            return (
                <div>鐵塔資訊</div>
            );
        }
        if (_item === 4) {
            return (
                <div>帳號管理</div>
            );
        }
        if (_item === 5) {
            return (
                <div>變更紀錄</div>
            );
        }
    }
    return (
        <Layout className='h-full'>
            <Sider>
                <div className='sider flex flex-col mt-16 min-h-screen'>
                    <Menu mode='vertical' defaultSelectedKeys={['eventlist']}>
                        <Menu.Item key="eventlist" onClick={() => _setItem(1)}>
                            <div>事件列表</div>
                        </Menu.Item>
                        <Menu.Item key="lineinfo" onClick={() => _setItem(2)}>
                            <div>輸電線資訊</div>
                        </Menu.Item>
                        <Menu.Item key="towerinfo" onClick={() => _setItem(3)}>
                            <div>鐵塔資訊</div>
                        </Menu.Item>
                        <Menu.Item key="accountmanage" onClick={() => _setItem(4)}>
                            <div>帳號管理</div>
                        </Menu.Item>
                        <Menu.Item key="changerecord" onClick={() => _setItem(5)}>
                            <div>變更紀錄</div>
                        </Menu.Item>
                    </Menu>
                </div>
            </Sider>
            <Layout>
                <Header className='bg-white flex flex-row-reverse'>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a onClick={(e)=>e.preventDefault()}>
                            <Space className="text-black">
                                Hello, {_username} <DownOutlined/>
                            </Space>
                        </a>
                    </Dropdown>
                </Header>
                <Content>
                    <Page/>
                </Content>
            </Layout>
        </Layout>

    );

}
export default Manage;
