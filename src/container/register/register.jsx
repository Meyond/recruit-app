import React, { Component } from "react";
import {
  List,
  Radio,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
} from "antd-mobile";
import { Redirect } from "react-router-dom";
import Logo from "../../component/logo/logo.jsx";
import { connect } from "react-redux";
import { register } from "../../redux/user.redux";
import { md5Pwd } from "../../util";
import customFrom from "../../component/form/custom-form";

@connect(state => state.user, { register })
@customFrom
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister() {
    // console.log(this.props.state);
    console.log('触发register');
    this.props.register(this.props.state);
  }

  render() {
    const { RadioItem } = Radio;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <h2 style={{ textAlign: "center" }}>注册</h2>
        <WingBlank>
          {this.props.msg ? (
            <p className="error-msg">{this.props.msg}</p>
          ) : null}
          <List>
            <InputItem
              onChange={val => this.props.handleChange("user", val)}
              type="text"
              placeholder="请输入用户名"
            >
              用户名
            </InputItem>
            <InputItem
              onChange={val => this.props.handleChange("pwd", md5Pwd(val))}
              type="password"
            >
              密码
            </InputItem>
            <InputItem
              onChange={val => this.props.handleChange("repeatpwd", md5Pwd(val))}
              type="password"
            >
              确认密码
            </InputItem>
            <RadioItem
              checked={this.props.state.type === "genius"}
              onChange={() => {
                this.props.handleChange("type", "genius");
              }}
            >
              牛人
            </RadioItem>
            <RadioItem
              checked={this.props.state.type === "boss"}
              onChange={() => {
                this.props.handleChange("type", "boss");
              }}
            >
              Boss
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}
