import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import rainbowLogo from "../assets/icon/logo-rainbow.png";

import { postUser, getUserRole } from "../api/frontApi";
import { resetTest, loginAction,storeUserInfo } from "../actions/frontAction";
import { Form, Input, message, Button } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import userIcon from "../assets/img/username.png";
import passwordIcon from "../assets/img/password.png";
import { connect } from "react-redux";
import "./Login.css";

console.log(document.cookie)
// document.cookie = "fltk="+";path=/"
// document.cookie = "flid=" +";path=/"
// document.cookie = "fln=" +";path=/"
// document.cookie = "user_id=" +";path=/"
// document.cookie = "email=" +";path=/"
// document.cookie = "chat_id=" +";path=/"
// document.cookie = "user_name=" +";path=/"
// document.cookie = "region_id=" +";path=/"
// document.cookie = "region_name=" +";path=/"
// document.cookie = "roles=" +";path=/"
// console.log("initcookie")
// console.log(document.cookie)


function Login({ user, resetTest, loginAction,storeUserInfo }) {
  const _history = useHistory();
  const [isLoading, setIsLoading] = useState(false)
  // const testbtn = () => {
  //   console.log(user);
  //   resetTest(10)
  console.log(user);
  // };
  const _handleLogin = (values) => {
    setIsLoading(true)
    document.cookie = "usr=" + values.username+";path=/";
    document.cookie = "psw=" + values.password+";path=/";
    postUser(values.username, values.password).then((data) => {
      if (data && data.errStatus) {
        message.error(data.errDetail);
      } else {
        console.log(data);
        loginAction(data.access_token);

        document.cookie = "fltk=" + data.access_token+";path=/";
        document.cookie = "flid=" + data.group_id+";path=/";
        document.cookie = "fln=" + data.username+";path=/";
        console.log(document.cookie);
        
        getUserRole(data.access_token).then((userData) => {
          
        document.cookie = "user_id=" + userData.user_id+";path=/";
        document.cookie = "email=" + userData.email+";path=/";
        document.cookie = "chat_id=" + userData.chat_id+";path=/";
        document.cookie = "user_name=" + userData.user_name+";path=/";
        document.cookie = "region_id=" + userData.region_id+";path=/";
        document.cookie = "region_name=" + userData.region_name+";path=/";
        document.cookie = "roles=" + JSON.stringify(userData.roles)+";path=/";
        storeUserInfo(userData);
        // console.log(userData);
        // console.log(document.cookie);
        setIsLoading(false)
        _history.push("/tr/search");
        // console.log("3")
        });
      }
    })
    .catch((error) => {
      // 處理其他錯誤，例如網絡錯誤等
      setIsLoading(false)
      message.error("登入失敗，請檢查帳號密碼是否正確。");
      console.error("Login failed:", error);
      
    });
  };
// console.log(document.cookie)
  return (
    <>
      {document.cookie.split("; ").find((row) => row.startsWith("user_name"))?.split("=")[1] ? (
        <>{
          _history.push("/tr/search")}</>
      ) : (
        <div className="w-screen h-screen bg-cover bg-center items-center flex justify-center ">
          <div className="flex flex-col items-center ">
            <img src={rainbowLogo} className="w-24 h-24" />
          <div className="mt-10 px-24 py-12 bg-white shadow rounded "> 
            {/* <div>
              <button onClick={testbtn}>test</button>
            </div> */}
            <Form
              onFinish={_handleLogin}
              className="h-full flex flex-col justify-between"
            >
              <div className="flex justify-center">
                <Form.Item>
                  <div className="flex items-center">
                    {/* <img src={rainbowLogo} className="w-12 h-12" /> */}
                    <div className="text-base font-extrabold ml-2">
                      配電變壓器之負載變化預測及利用率分析系統
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
                      placeholder="請輸入帳號"
                      size="large"
                      maxLength={20}
                      prefix={<UserOutlined />}
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "密碼錯誤，請再試一次",
                      pattern: new RegExp(/^[A-z0-9]*$/),
                    },
                  ]}
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
                  {
                    isLoading ? <Button className="btn" type="primary" loading>登入</Button> : <button className="btn">登入</button>
                  }
                </Form.Item>
              </div>
            </Form>
          </div>
          </div>
          </div>
      )}
    </>
  );
}

const mapStateToProps = ({ userReducer }) => ({
  user: userReducer,
});

const mapDispatchToProps = {
  resetTest,
  loginAction,
  storeUserInfo
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
