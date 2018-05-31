import axios from "axios";
import { getRedirectPath } from "../util";
import { Toast } from "antd-mobile";

const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const ERROR_MSG = "ERROR_MSG";

//定义初始状态
const initState = {
  redirectTo: "",
  isAuth: false,
  msg: "",
  user: "",
  pwd: "",
  type: ""
};
//reducer
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: "",
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload
      };
      break;
    case LOGIN_SUCCESS:
      return {
        ...state,
        msg: "",
        redirectTo: getRedirectPath(action.payload)
      };
      break;
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg };
      break;
    default:
      return state;
      break;
  }
}

function registerSuccess(data) {
  return { type: REGISTER_SUCCESS, payload: data };
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}

function loginSuccess(data) {
  return { type: LOGIN_SUCCESS, payload: data };
}

export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg("请输入用户名和密码！");
  }

  if (pwd !== repeatpwd) {
    return errorMsg("两次密码不一致！");
  }

  //发起注册请求
  return dispatch => {
    axios.post("/user/register", { user, pwd, type }).then(res => {
      if (res.status == 200 && res.code === 0) {
        dispatch(REGISTER_SUCCESS({ user, pwd, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
        // Toast.fail(res.data.msg, 1);
      }
    });
  };
}

//登录
export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg("请输入用户名和密码！");
  }
  //发起登录请求
  return dispatch => {
    axios.post("/user/login", { user, pwd }).then(res => {
      if (res.status == 200 && res.code == 0) {
        dispatch(loginSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
