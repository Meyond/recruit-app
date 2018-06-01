import React, { Component } from "react";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { connect } from "react-redux";
import Logo from "../../component/logo/logo.jsx";
import { md5Pwd } from "../../util";
import { login } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";

@connect(state => state.user, { login })
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pwd: ""
    };
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  register() {
    this.props.history.push("/register");
  }

  handleLogin() {
    console.log('触发登录');

    this.props.login(this.state);
  }

  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <h2 style={{ textAlign: "center" }}>登录页</h2>
        <WingBlank>
          <List>
            <InputItem
              onChange={val => this.handleChange("user", val)}
              type="text"
              placeholder="请输入用户名"
            >
              用户
            </InputItem>
            <InputItem
              onChange={val => this.handleChange("pwd", md5Pwd(val))}
              type="password"
            >
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleLogin}>
            登录
          </Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}
