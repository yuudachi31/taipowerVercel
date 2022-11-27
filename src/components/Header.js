import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button } from 'antd';
import logo from '../assets/icon/logo-rainbow.png';

//antd
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';


function _logout(e) {
  document.cookie = 'fln=; Max-Age=-99999999;';
  document.cookie = 'fltk=; Max-Age=-99999999;';
  document.cookie = 'flid=; Max-Age=-99999999;';
}

function Header() {
  const menu = (
    <Menu defaultSelectedKeys={['logout']} className="">
      <Menu.Item key="logout">
        <div onClick={_logout}>登出</div>
      </Menu.Item>
    </Menu>
  );
  const _history = useHistory();
  const _login_status = document.cookie.split('; ').find(row => row.startsWith('fln')) ? true : false;
  var _group_id;
  var _username;
  if (_login_status) {
    _group_id = document.cookie.split('; ').find(row => row.startsWith('flid')).split('=')[1];
    _username = document.cookie.split('; ').find(row => row.startsWith('fln')).split('=')[1];
  }
  function _gotomanage() {
    
  }

  return (
    <>
      <header className="relative flex items-center justify-between md:px-10 px-8 h-header shadow-header z-50">
        <div className='w-1/3 flex items-center'>
          <img className=' w-9 h-9 mr-5' src={logo}></img>
          <div className='w-1/3 text-center text-xl'>電壓器查詢列表</div>
        </div>
        <div className="w-1/3 flex items-center justify-end">
          <button className='p-2 mx-3 btn font-bold flex-none tracking-8' type='primary' onClick={_gotomanage}>帳號管理</button>
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <a className='flex items-center text-black' onClick={(e) => e.preventDefault()}>
            <div className='text-sm text-black mr-3'>User_001</div>
            <div className='flex items-center'><DownOutlined className='text-sm text-black' /></div>
          </a>
        </Dropdown>
        </div>
      </header>
    </>

    // <>
    //   {
    //     _login_status ?
    //       <header className="relative flex items-center justify-between md:px-10 px-8 h-header shadow-header z-50 bg-purple-500 text-white">
    //         <div className='w-1/3'><img src={logo}></img></div>
    //         <div className='w-1/3 text-center'>智慧電表系統</div>
    //         <div className="w-1/3 flex items-center justify-end">
    //           {
    //             _group_id == 3 ?
    //               <Button className='p-2 mx-3' type='primary' onClick={_gotomanage}>管理後台</Button>
    //               : <></>}
    //           <UserOutlined className='text-xl' />
    //           <div className='mx-2'>{_username}</div>
    //           <div> | </div>
    //           <Button className='p-2 mx-3' type='primary' onClick={_logout} href="/login">登出</Button>
    //         </div>
    //       </header> : <>
    //         {_history.push('/login')}</>
    //   }
    // </>
  );
}

export default Header;