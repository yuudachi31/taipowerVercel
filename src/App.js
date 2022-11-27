import "antd/dist/antd.less";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Redirect

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TRInfo from "./pages/Transformer/TRInfo";
import TRSearch from "./pages/Transformer/TRSearch";

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
