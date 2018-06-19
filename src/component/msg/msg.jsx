import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";

@connect(state => state)
export default class Msg extends Component {
  getLast(arr) {
    return arr[arr.length - 1];
  }

  render() {
    const userid = this.props.user._id;
    const userinfo = this.props.chat.users;
    const msgGroup = {};
    this.props.chat.chatmsg.forEach(el => {
      msgGroup[el.chatid] = msgGroup[el.chatid] || [];
      msgGroup[el.chatid].push(el);
    });

    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time;
      const b_last = this.getLast(b).create_time;
      return b_last - a_last;
    });

    return (
      <div>
        {chatList.map(v => {
          const lastItem = this.getLast(v);
          const targetId = v[0].from === userid ? v[0].to : v[0].from;
          const unreadNum = v.filter(v => !v.read && v.to === userid).length;
          const name = userinfo[targetId] && userinfo[targetId].name;
          const avatar = userinfo[targetId] && userinfo[targetId].avatar;
          return (
            <List key={lastItem._id}>
              <List.Item
                extra={<Badge text={unreadNum} />}
                arrow='horizontal'
                thumb={require(`../img/${avatar}.png`)}
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
              >
                <List.Item.Brief>{name}</List.Item.Brief>
                {lastItem.content}
              </List.Item>
            </List>
          );
        })}
      </div>
    );
  }
}
