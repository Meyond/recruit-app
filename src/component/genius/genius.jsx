import React, { Component } from "react";
import UserCard from "../../component/usercard/usercard";
import { connect } from "react-redux";
import { getUserList } from "../../redux/chatuser.redux";

@connect(
  state => state.chatuser,
  { getUserList }
)
export default class Genius extends Component {
  componentDidMount() {
    this.props.getUserList("boss");
  }

  render() {
    return (
      <div>
        <UserCard userlist={this.props.userlist} />
      </div>
    );
  }
}
