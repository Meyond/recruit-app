import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import reducers from "./reducer.js";
import Login from "./container/login/login.jsx";
import Register from "./container/register/register.jsx";
import BossInfo from "./container/bossinfo/bossinfo.jsx";
import GeniusInfo from "./container/geniusinfo/geniusinfo.jsx";
import Dashboard from "./component/dashboard/dashboard";
import AuthRoute from "./component/authRoute/authRoute.jsx";
import "./config.js";
import "./index.css";
// import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();
