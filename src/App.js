import "antd/dist/antd.less";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Redirect

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TRInfo from "./pages/Transformer/TRInfo";

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
          <TRInfo />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
