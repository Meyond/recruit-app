import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

@withRouter
export default class AuthRoute extends Component {
  /**
   * 获取用户信息
   * 判断是否登录和用户类型
   */
  componentDidMount() {
    //打印props信息
    console.log(this.props);

    const publicList = ["/login", "/register"];
    const pathName = this.props.location.pathname;
    if (publicList.indexOf(pathName) > -1) {
      return null;
    }

    //获取用户信息
    axios.get("/user/info").then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          console.log(this.this.props.history);
        } else {
          this.props.history.push("/login");
        }
      }
    });
  }

  render() {
    return <div />;
  }
}
