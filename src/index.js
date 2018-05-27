import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to="/"></Link></li>
          <li><Link to="/yi"></Link></li>
          <li><Link to="/er"></Link></li>
        </ul>

        <Route path='/' exact component={App}></Route>
        <Route path='/yi' component={Yi}></Route>
        <Route path='/er' component={Er}></Route>

        <Redirect to="/"></Redirect>

      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
