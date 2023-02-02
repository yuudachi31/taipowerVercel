import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import rainbowLogo from "../assets/icon/logo-rainbow.png";

import { postUser } from "../api/frontApi";


import { Form, Input, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined
} from "@ant-design/icons";
import userIcon from '../assets/img/username.png';
import passwordIcon from '../assets/img/password.png';

import './Login.css'

function Login() {
  const _history = useHistory();


  const _handleLogin = (values) => {
    // postUser(values.username, values.password).then((data) => {
    //   if (data.errStatus) {
    //     message.error(data.errDetail);
    //   } else {
    //     document.cookie = 'fltk=' + data.token;
    //     document.cookie = 'flid=' + data.group_id;
    //     document.cookie = 'fln=' + data.username;
    //     _history.push('/')
    //   }
    // })

  };

  return (
    <>
      {document.cookie.split('; ').find(row => row.startsWith('fln')) ?
        <>{_history.push('/')}</> :
        <div className="w-screen h-screen bg-cover bg-center bg-login flex justify-center items-center">
          <div className="w-2/5 h-1/2 px-12 py-12 absolute bg-white shadow rounded border-black">
            <Form onFinish={_handleLogin} className="h-full flex flex-col justify-between">
              <div className="flex justify-center">
                <Form.Item>
                  <div className="flex items-center">
                    <img src={rainbowLogo} className="w-12 h-12" />
                    <div className="text-base font-extrabold ml-2">
                      變壓器查詢列表
                    </div>
                  </div>
                </Form.Item>
              </div>

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
                  <div className="flex flex-row items-center">
                    <div className=" w-20">帳號：</div>
                    <Input
                      className="p-12"
                      placeholder="請輸入信箱"
                      size="large"
                      maxLength={20}
                      prefix={<UserOutlined/>}
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{
                    required: true, message: "密碼錯誤，請再試一次",
                    pattern: new RegExp(/^[A-z0-9]*$/),
                  }]}
                >
                  <div className="flex flex-row items-center">
                    <div className=" w-20">密碼：</div>
                    <Input.Password
                      placeholder="請輸入密碼"
                      size="large"
                      maxLength={20}
                      prefix={<LockOutlined />}
                      
                    />
                  </div>
                </Form.Item>
              </div>
              <div className="flex justify-center">
                <Form.Item>
                  <button
                    className="btn"
                  >登入
                  </button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      }</>
  );
}

export default Login;
