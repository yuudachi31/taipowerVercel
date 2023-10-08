import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import rainbowLogo from "../assets/icon/logo-rainbow.png";

import { postUser, getUserRole } from "../api/frontApi";
import { resetTest, loginAction,storeUserInfo } from "../actions/frontAction";
import { Form, Input, message } from "antd";
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

function Login({ user, resetTest, loginAction,storeUserInfo }) {
  const _history = useHistory();
  // const testbtn = () => {
  //   console.log(user);
  //   resetTest(10)
  console.log(user);
  // };
  const _handleLogin = (values) => {
    postUser(values.username, values.password).then((data) => {
      if (data.errStatus) {
        message.error(data.errDetail);
      } else {
        console.log(data);
        loginAction(data.access_token);

        document.cookie = "fltk=" + data.access_token;
        document.cookie = "flid=" + data.group_id;
        document.cookie = "fln=" + data.username;
        console.log(document.cookie);
        _history.push("/");
        getUserRole(data.access_token).then((data) => {
          storeUserInfo(data);
        document.cookie = "user_id=" + data.user_id;
        document.cookie = "email=" + data.email;
        document.cookie = "chat_id=" + data.chat_id;
        document.cookie = "user_name=" + data.user_name;
        document.cookie = "region_id=" + data.region_id;
        document.cookie = "region_name=" + data.region_name;
        document.cookie = "roles=" + JSON.stringify(data.roles);
        

        });
      }
    });
  };

  return (
    <>
      {document.cookie.split("; ").find((row) => row.startsWith("fln")) ? (
        <>{_history.push("/")}</>
      ) : (
        <div className="w-screen h-screen bg-cover bg-center items-center flex justify-center ">
          <div className="flex flex-col items-center ">
            <img src={rainbowLogo} className="w-24 h-24" />
          <div className="mt-4 px-12 py-12 bg-white shadow rounded border-black"> 
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
                  <button className="btn">登入</button>
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
