import axios from "axios";
import { getRedirectPath } from "../util";
import { Toast } from "antd-mobile";

// action的事件类型 == 字符串 == 常量
const AUTH_SUCCESS = "AUTH_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";

//定义初始状态
const initState = {
  redirectTo: "",
  msg: "",
  user: "",
  type: ""
};

//reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: "",
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload
      };
      break;
    case LOAD_DATA:
      return { ...state, ...action.payload };
      break;
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg };
      break;
    default:
      return state;
      break;
  }
}

function authSuccess(data) {
  return { type: AUTH_SUCCESS, payload: data };
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}

export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo };
}

//注册
export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg("请输入用户名和密码！");
  }
  if (pwd !== repeatpwd) {
    return errorMsg("两次密码不一致！");
  }

  return dispatch => {
    axios.post("/user/register", { user, pwd, type }).then(res => {
      if (res.status === 200 && res.code === 0) {
        dispatch(AUTH_SUCCESS({ user, pwd, type }));
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
  return dispatch => {
    axios
      .post("/user/login", { user, pwd })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          Toast.fail(res.data.msg);
          dispatch(errorMsg(res.data.msg));
        }
      })
      .catch(err => {
        Toast.fail("网络错误！");
        throw err;
      });
  };
}

//更新信息
export function update(data) {
  return dispatch => {
    axios.post("/user/update", data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
