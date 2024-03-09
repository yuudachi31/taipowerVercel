import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button } from 'antd';
import logo from '../assets/icon/logo-rainbow.png';
import { useReducer } from 'react';
//antd
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Divider, Modal } from 'antd';
import { userReducer } from '../reducers/userReducer';
import { connect } from "react-redux";



function ErrorModal({setIsErrorModalOpen,isErrorModalOpen,errStatus}) {
    // console.log(user.user_info.user_name)
const handleOk =()=>{
console.log("ok")
setIsErrorModalOpen(false)
if(errStatus==401){
    console.log("logout")
    _logout()
}
}
const handleCancel =()=>{
console.log("nono")
setIsErrorModalOpen(false)

    // console.log("logout")
    // _logout()

}
const _history = useHistory();
const _logout = (e) => {
    document.cookie = "fltk=''" + ";path=/";
    document.cookie = "flid=''" + ";path=/";
    document.cookie = "fln=" + ";path=/";
    document.cookie = "user_id=" + ";path=/";
    document.cookie = "email=" + ";path=/";
    document.cookie = "chat_id=" + ";path=/";
    document.cookie = "user_name=" + ";path=/";
    document.cookie = "region_id=" + ";path=/";
    document.cookie = "region_name=" + ";path=/";
    document.cookie = "roles=" + ";path=/";
    //筆記: 有出現同名cookie的現象，結果是因為path或max-age參數如果不同會被認為不同cookie
    //另外cookie的預設max-age是-1，即關閉瀏覽器就會刪除
    // console.log("logout!")
    // console.log(document.cookie);
    _history.push('/login')
}
    return (
        <Modal
            title={"錯誤"+errStatus}
            open={isErrorModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="關閉"
            // cancelText="登出"
            footer={[
                // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
                // <Button type="primary" onClick={_logout}>登出</Button>,
                <Button type="primary" onClick={handleOk}>確認</Button>
            ]}
        >
            {
                errStatus==403?(<p>操作失敗 權限不足!</p>):
                errStatus==401?(<p>登入逾時 請重新登入!</p>):
                (<p>操作失敗 網站發生了問題!</p>)
            }
            
        </Modal>
    );
}

// const mapDispatchToProps = {

// };
export default ErrorModal;