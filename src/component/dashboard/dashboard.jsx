import React, { Component } from "react";
import { NavBar } from "antd-mobile";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Boss from "../../component/boss/boss";
import Genius from "../../component/genius/genius";
import User from "../../component/user/user";
import Msg from "../../component/msg/msg";
import NavLinkBar from "../navlink/navlink";

@connect(state => state)
export default class Dashboard extends Component {

  render() {
    const { pathname } = this.props.location;
    const navList = [
      {
        path: "/boss",
        text: "牛人",
        icon: "boss",
        title: "牛人列表",
        component: Boss,
        // hide: user.type == "genius"
      },
      {
        path: "/genius",
        text: "boss",
        icon: "job",
        title: "Boss列表",
        component: Genius,
        // hide: user.type == "boss"
      },
      {
        path: "/msg",
        text: "消息",
        icon: "msg",
        title: "消息列表",
        component: Msg
      },
      {
        path: "/user",
        text: "个人中心",
        icon: "user",
        title: "个人中心",
        component: User
      }
    ];
    return (
      <div>
        <NavBar className="fixed-header" mode="dark">
          {navList.find(val => val.path === pathname).title}
        </NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map(val => (
              <Route key={val.path} path={val.path} component={val.component} />
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} />
      </div>
    );
  }
}
