import "antd/dist/antd.less";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
// Redirec

import Header from "./components/Header";
import ManageHeader from "./components/ManageHeader";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TRInfo from "./pages/Transformer/TRInfo";
import TRSearch from "./pages/Transformer/TRSearch";
import TRAbnormal from "./pages/Transformer/TRAbnormal";
import AMIInfo from "./pages/Transformer/AMIInfo";
import Manage from "./pages/Manage/Manage";
import DataManage from "./pages/Manage/DataManage";

function App() {
  return (
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
