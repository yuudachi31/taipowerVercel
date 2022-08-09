import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import rainbowLogo from "../assets/icon/logo-rainbow.png";

import { postUser } from "../api/frontApi";


import { Form, Input, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import userIcon from '../assets/img/username.png';
import passwordIcon from '../assets/img/password.png';

import './Login.css'

function Login() {
  const _history = useHistory();


  const _handleLogin = (values) => {
    postUser(values.username,values.password).then((data)=>{
      if(data.errStatus){
        message.error(data.errDetail);
      }else{
        document.cookie= 'fltk='+ data.token;
        document.cookie= 'flid=' + data.group_id;
        document.cookie= 'fln=' + data.username;
        _history.push('/')
      }
    })

  };

  return (
    <>
    {document.cookie.split('; ').find(row => row.startsWith('fln')) ? 
    <>{ _history.push('/')}</> :
    <div className="w-screen h-screen bg-cover bg-center bg-login">
      <div className="w-1/4 h-3/5 px-12 py-12 ml-56 mt-32 absolute bg-white shadow rounded border-black">
        <Form onFinish={_handleLogin} className="h-full flex flex-col justify-between">
          <Form.Item>
            <div className="flex flex-row">
              <img src={rainbowLogo} className="w-12 h-12" />
              <div className="text-liteBlue text-base text-bold ml-2">
                供電線路智慧故障
                <br />
                定位系統
              </div>
            </div>
          </Form.Item>
          <div>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "請輸入正確使用者名稱！",
                pattern: new RegExp(/^[A-z0-9@.]*$/),
              },
            ]}
          >
            <div className="flex flex-row items-center border-b-2 border-gray-500">
              <img src={userIcon} className="mr-3"/>
              <div className="">|</div>
              <Input
                className="p-12"
                placeholder="請輸入使用者名稱"
                bordered={false}
                size="large"
                maxLength={20}
                status="error"
              />
            </div>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "密碼錯誤，請再試一次",
            pattern: new RegExp(/^[A-z0-9]*$/),}]}
          >
            <div className="flex flex-row items-center border-b-2 border-gray-500">
              <img src={passwordIcon} className="mr-3"/>
              <div className="">|</div>
              <Input.Password
                placeholder="請輸入密碼"
                bordered={false}
                size="large"
                maxLength={20}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
          </Form.Item>
          </div>
          <Form.Item>
            <button
              className="w-full h-10 bg-gradient-to-r from-litePurple to-liteBlue hover:from-white hover:to-white text-white hover:text-liteBlue border-white border-2 hover:border-liteBlue text-center inline-block align-middle leading-9 rounded"
            >登入
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  }</>
  );
}

export default Login;
