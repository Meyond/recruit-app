import axios from "axios";
import io from "socket.io-client";
// import { user } from "./user.redux";

const skt = io("ws://localhost:9093");

const MSG_LIST = "MSG_LIST";
const MSG_RECV = "MSG_RECV";
const MSG_READ = "MSG_READ";

const initState = {
  chatmsg: [],
  unread: 0,
  users: {}
};

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        users: action.payload.users,
        chatmsg: action.payload.msgs,
        unread: action.payload.msgs.filter(
          item => !item.read && item.to === action.payload.userid
        ).length
      };
    case MSG_RECV:
      const num = action.payload.to === action.payload.userid ? 1 : 0;
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload.msg],
        unread: state.unread + num
      };
    case MSG_READ:
      const { from } = action.payload;
      return {
        ...state,
        chatmsg: state.chatmsg.map(v => ({
          ...v,
          read: from==v.from? true : v.read
        })),
        unread: state.unread - action.payload.num
      };
    default:
      return state;
  }
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get("/user/getmsglist").then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id;
        dispatch(msgList(res.data.msgs, res.data.users, userid));
      }
    });
  };
}

export function sendMsg({ from, to, msg }) {
  return dispatch => {
    skt.emit("sendmsg", { from, to, msg });
  };
}

export function recvMsg() {
  return (dispatch, getState) => {
    skt.on("recvmsg", function(data) {
      console.log("recvmsg", data);
      const userid = getState().user._id;
      dispatch(msgRecv(data, userid));
    });
  };
}

export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post(`/user/readmsg`, { from }).then(res => {
      const userid = getState().user._id;
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgRead({ userid, from, num: res.data.num }));
      }
    });
  };
}

function msgRead({ from, to, num }) {
  return { type: MSG_READ, payload: { from, to, num } };
}

function msgList(msgs, users, userid) {
  return { type: MSG_LIST, payload: { msgs, users, userid } };
}

function msgRecv(msg, userid) {
  return { type: MSG_RECV, payload: { msg, userid } };
}
