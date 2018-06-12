import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Toast } from "antd-mobile";
import { loadData } from "../../redux/user.redux";
import { connect } from "react-redux";

@withRouter
@connect(
  null,
  { loadData }
)
export default class AuthRoute extends Component {
  /**
   * 获取用户信息
   * 判断是否登录和用户类型
   */
  componentDidMount() {
    //打印props信息
    // console.log(this.props);


    const publicList = ["/login", "/register"];
    const pathName = this.props.location.pathname;

    // //处理默认路由
    // if (pathName === "/") {
    //   this.props.history.push("/login");
    // }

    if (publicList.indexOf(pathName) > -1) {
      // return null;
    }

    axios.get("/user/info").then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          this.props.loadData(res.data.data);
          // console.log(this.props.history);
        } else {
          this.props.history.push("/login");
        }
      } else {
        Toast.fail("请求错误！");
      }
    });
  }

  render() {
    return <div />;
  }
}
