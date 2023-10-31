import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button } from 'antd';
import logo from '../assets/icon/logo-rainbow.png';
import { useReducer } from 'react';
//antd
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { userReducer } from '../reducers/userReducer';
import { connect } from "react-redux";



function Header2({user}) {
  // console.log(user.user_info.user_name)
  function _logout(e) {
    document.cookie = 'fln=; Max-Age=-99999999;';
    document.cookie = 'fltk=; Max-Age=-99999999;';
    document.cookie = 'flid=; Max-Age=-99999999;';
    _history.push('/login')
  }
  function _gotosearch() { //全部變壓器
    _history.push('/tr/search')  
  }
  function _gotoabnormal() { //異常變壓器
    _history.push('/tr/abnormal')  
  }
  function _gotomanage1() { //閥值管理
    _history.push('/manage/threshold') 
  }
  function _gotomanage2() { //推播管理
    _history.push('/manage/notify')
  }
  function _gotomanage3() { //帳號管理
    _history.push('/manage/user')
  }
  function _gotomanage4() { //AMI匯入
    _history.push('/manage2/AMIimport')
  }
  function _gotomanage5() { //變壓器匯出
    _history.push('/manage2/transformerRemit')
  }

  const menu = (
    <Menu defaultSelectedKeys={['logout']} className="">
      <Menu.Item key="logout">
        <div onClick={_logout}>登出</div>
      </Menu.Item>
    </Menu>
  );

  const manage_menu = (
    <Menu defaultSelectedKeys={['3']} className="">
      <Menu.Item key="1">
        <div onClick={_gotomanage1}>閥值管理</div>
      </Menu.Item>
      <Menu.Item key="2">
        <div onClick={_gotomanage2}>推播管理</div>
      </Menu.Item>
      <Menu.Item key="logout">
        <div onClick={_gotomanage3}>帳號管理</div>
      </Menu.Item>
    </Menu>
  );
  const info_menu = (
    <Menu defaultSelectedKeys={['3']} className="">
      <Menu.Item key="1">
        <div onClick={_gotomanage4}>AMI匯入</div>
      </Menu.Item>
      <Menu.Item key="2">
        <div onClick={_gotomanage5}>變壓器匯出</div>
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
  
  
  return (
    <>
      <header className="relative flex items-center justify-between md:px-10 px-8 h-header shadow-header z-50">
        <div className='w-1/3 flex items-center'>
          <img className=' w-9 h-9 mr-5' src={logo}></img>
          <div className='w-1.2/3 text-center text-xl '>後台系統操作頁面</div>
        </div>
        <div className="w-1/3 flex items-center justify-end">
          <button className='p-1 mx-3  flex-none tracking-8'  onClick={_gotosearch}>全部變壓器</button>
          <button className='p-1 mx-3  flex-none tracking-8'  onClick={_gotoabnormal}>異常變壓器</button>
          <button className='p-1 mx-3  flex-none tracking-8'  onClick={_gotomanage1}>帳號管理</button>
          <button className='p-1 mx-3 flex-none tracking-8'  onClick={_gotomanage4}>資料管理</button>
          {/* <Dropdown overlay={manage_menu} trigger={['click']} placement="bottomRight">
          <a className='flex items-center text-black p-1 mx-2  flex-none tracking-8' onClick={(e) => e.preventDefault()}>
            <div className='text-sm text-black mr-2'>帳號管理</div>
            <div className='flex items-center'><DownOutlined className='text-sm text-black' /></div>
          </a>
        </Dropdown>
        <Dropdown overlay={info_menu} trigger={['click']} placement="bottomRight">
          <a className='flex items-center text-black p-1 mx-2  flex-none tracking-8' onClick={(e) => e.preventDefault()}>
            <div className='text-sm text-black mr-2'>資料管理</div>
            <div className='flex items-center'><DownOutlined className='text-sm text-black mr-2' /></div>
          </a>
        </Dropdown> */}
          {/* <button className='p-1 mx-3  flex-none tracking-8'  onClick={_gotomanage}>帳號管理</button>
          <button className='p-1 pr-4 mx-3  flex-none tracking-8'  onClick={_gotomanage}>資料管理</button> */}
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <a className='flex items-center text-black' onClick={(e) => e.preventDefault()}>
            <div className='text-sm text-black mr-2 ml-3'>{user.user_info.user_name?user.user_info.user_name:"User_001"}</div>
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
const mapStateToProps = ({ userReducer }) => ({
  user: userReducer,
});

// const mapDispatchToProps = {

// };
export default connect(mapStateToProps, null)(Header2);