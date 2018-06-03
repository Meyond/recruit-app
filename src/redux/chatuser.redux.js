import axios from "axios";
import { Toast } from "antd-mobile";

const USER_LIST = "USER_LIST";

const initState = {
  userlist: []
};

function userList(data) {
  return { type: USER_LIST, payload: data };
}

export function chatuser(state = initState, action) {
  switch (action.type) {
    case USER_LIST:
      return { ...state, userlist: action.payload };
      break;
    default:
      return state;
      break;
  }
}

export function getUserList(type) {
  return dispatch => {
    axios.get(`/user/list?type=${type}`).then(res => {
      if (res.data.code === 0) {
        dispatch(userList(res.data.data));
      } else {
        Toast.fail(res.data.msg);
      }
    });
  };
}
