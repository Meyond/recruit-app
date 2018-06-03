import React, { Component } from "react";
import { Grid, List } from "antd-mobile";
import PropTypes from "prop-types";

export default class AvatarSelector extends Component {
  //属性检测
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const avatarList = "boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra"
      .split(",")
      .map(val => ({
        icon: require(`../img/${val}.png`),
        text: val
      }));

    const gridHeader = this.state.text ? (
      <div>
        <span>已选头像</span>
        <img src={this.state.icon} style={{ width: 20 }} alt="" />
      </div>
    ) : <div>请选择头像</div>;

    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={el => {
              this.setState(el);
              this.props.selectAvatar(el.text);
            }}
          />
        </List>
      </div>
    );
  }
}
