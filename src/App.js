import "antd/dist/antd.less";
import "./App.css";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { Layout } from 'antd';
// Redirec
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Header from "./components/Header";
import ManageHeader from "./components/ManageHeader";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TRInfo from "./pages/Transformer/TRInfo";
import TRSearch from "./pages/Transformer/TRSearch";
import TRAbnormal from "./pages/Transformer/TRAbnormal";
import IndustryInfo from "./pages/Transformer/IndustryInfo";
import PredictPage from "./pages/Transformer/PredictPage";
import EChartMonthPage from "./pages/Transformer/EChartMonthPage";
import EChartDayPage from "./pages/Transformer/EChartDayPage";
import AMIInfo from "./pages/Transformer/AMIInfo";
import Manage from "./pages/Manage/Manage";
import DataManage from "./pages/Manage/DataManage";
import UploadPage from "./pages/UploadPage"
import ErrorModal from "./components/ErrorModal";

function App() {
  const [errorStatus, setErrorStatus] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  // const [errorStatus, setErrorStatus] = useState(200);
  useEffect(() => {
    // 設置 Axios 的全域錯誤攔截器
    Axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status) {
          // 如果有錯誤狀態碼，彈出錯誤 Modal
          setErrorStatus(error.response.status);
          setIsErrorModalOpen(true)
        }
        return Promise.reject(error);
      }
    );
  }, []);



  return (
    <div>
     
        <ErrorModal 
         setIsErrorModalOpen={setIsErrorModalOpen}
         isErrorModalOpen={isErrorModalOpen}
         errStatus={errorStatus}
         
         ></ErrorModal>
   
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
        <Route path="/login">
          <Login />
          
        
        </Route>
        <Route path="/tr/info"> 
          <Header />
          <TRInfo />
        </Route>
        <Route path="/tr/AMIinfo">
          <Header />
          <AMIInfo />
        </Route>
        <Route path="/tr/search">
          <Header />
          <TRSearch />
        </Route>
        <Route path="/tr/abnormal">
          <Header />
          <TRAbnormal />
        </Route>
        <Route path="/manage">
          <ManageHeader />
          <Manage />
        </Route>
        <Route path="/datamanage">
          <ManageHeader />
          <DataManage />
        </Route>
        <Route path="/uploadPage">
          <Header />
          < UploadPage />
        </Route>
        <Route path="/EChartMonthPage">
          <Header />
          <EChartMonthPage />
        </Route>
        <Route path="/EChartDayPage">
          <Header />
          <EChartDayPage />
        </Route>
        <Route path="/IndustryInfo">
          <Header />
          <IndustryInfo />
        </Route>
        <Route path="/PredictPage">
          <Header />
          <PredictPage />
        </Route>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
