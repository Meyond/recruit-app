import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button,
  WingBlank,
  WhiteSpace
} from "antd-mobile";
import AvatarSelect from "../../component/avatar-selector/avatar-selector";
import { connect } from "react-redux";
import { update } from "../../redux/user.redux";

@connect(state => state.user, { update })
export default class GeniusInfo extends Component {
  constructor(props) {
    super(props);
  }
  onChange(key, val) {
    this.setState({ [key]: val });
  }

  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect!==path? <Redirect to={this.props.redirectTo }></Redirect> : null}
        <NavBar mode="dark">牛人完善信息页面</NavBar>
        <AvatarSelect
          selectAvatar={img => {
            // console.log(img);
            this.setState({ avatar: img });
          }}
        />
        <InputItem onChange={val => this.onChange("title", val)}>
          求职岗位
        </InputItem>
        <TextareaItem
          rows={3}
          autoHeight
          title="个人简介"
          onChange={val => this.onChange("desc", val)}
        />
        <WingBlank>
          <WhiteSpace />
          <Button
            type="primary"
            onClick={() => {
              this.props.update(this.state);
            }}
          >
            保存
          </Button>
        </WingBlank>
      </div>
    );
  }
}
