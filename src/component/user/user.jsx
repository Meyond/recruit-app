/*
 * Auth: Meyond (332595512@qq.com)
 * Date: 2018-06-02 23:19:30
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Result, List, WhiteSpace, Modal } from "antd-mobile";
import browserCookies from "browser-cookies";
import { logoutSubmit } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";

@connect(state => state.user, {logoutSubmit})
export default class User extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    Modal.alert("注销", "确认退出登录吗？", [
      {
        text: "取消",
        onPress: () => {
          console.log("取消")
        }
      },
      {
        text: "确认",
        onPress: () => {
          browserCookies.erase("userid");
          console.log("logout");
          // window.location.href = window.location.href
          this.props.logoutSubmit();
        }
      }
    ]);
  }

  render() {
    const headStyle = {
      width: "50px",
      borderRadius: "50%",
      border: "1px solid #ccc"
    };
    return this.props.user ? (
      <div>
        <Result
          img={
            <img
              src={require(`../img/${this.props.avatar}.png`)}
              style={headStyle}
              alt='avatar'
            />
          }
          title={this.props.user}
          message={this.props.type === "boss" ? this.props.company : null}
        />
        <List renderHeader={() => "简介"}>
          <List.Item multipleLine>
            {this.props.title}
            <List.Item.Brief>{this.props.desc}</List.Item.Brief>
            {this.props.salary ? (
              <List.Item.Brief>薪资：{this.props.salary}</List.Item.Brief>
            ) : null}
          </List.Item>
        </List>
        <WhiteSpace />
        <List>
          <List.Item onClick={this.logout}>退出登录</List.Item>
        </List>
      </div>
    ) : <Redirect to={this.props.redirectTo}></Redirect>;
  }
}
