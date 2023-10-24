import "antd/dist/antd.less";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from 'antd';
// Redirec

import Header from "./components/Header";
import Header2 from "./components/Header2";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TRInfo from "./pages/Transformer/TRInfo";
import TRSearch from "./pages/Transformer/TRSearch";
import TRAbnormal from "./pages/Transformer/TRAbnormal";
import Manage from "./pages/Manage/Manage";
import Manage2 from "./pages/Manage/Manage2";

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
        <Route path="/tr/search">
          <Header />
          <TRSearch />
        </Route>
        <Route path="/tr/abnormal">
          <Header />
          <TRAbnormal />
        </Route>
        <Route path="/manage">
          <Header2 />
          <Manage />
        </Route>
        <Route path="/manage2">
          <Header2 />
          <Manage2 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
