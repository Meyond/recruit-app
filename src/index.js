import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// const reduxDevTools = window.devToolsExtension ? window.devToolsExtension : ()=>{}
// const store = createStore(count, compose(
//   applyMiddleware(thunk),
//   reduxDevTools
// ))


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
