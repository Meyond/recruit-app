import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

@withRouter
@connect(
  state => state.chat,
  {  }
)
export default class NavLinkBar extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render() {
    const {pathname} = this.props.location;
    const navList = this.props.data.filter(val => !val.hide);
    return (
      <TabBar>
        {navList.map(val => (
          <TabBar.Item
            badge={val.path === '/msg'? this.props.unread:''}
            key={val.path}
            title={val.text}
            icon={{ uri: require(`./img/${val.icon}.png`) }}
            selectedIcon={{uri:require(`./img/${val.icon}-active.png`)}}
            selected={pathname === val.path}
            onPress={()=> {this.props.history.push(val.path)}}
          />
        ))}
      </TabBar>
    );
  }
}
