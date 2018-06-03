import React, { Component } from "react";
import { connect } from "react-redux";
import { Toast, Card, WhiteSpace, WingBlank } from "antd-mobile";
import { getUserList } from "../../redux/chatuser.redux";

@connect(state => state.chatuser, {getUserList})
export default class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.props.getUserList('genius')
  }
  render() {
    return (
      <WingBlank>
        {this.props.userlist.map(
          val =>
            val.avatar ? (
              <Card key={val._id}>
                <Card.Header
                  title={val.user}
                  thumb={require(`../img/${val.avatar}.png`)}
                  extra={ <span>{val.title}</span> }
                ></Card.Header>
                <Card.Body>
                  {val.desc}
                </Card.Body>
              </Card>
            ) : null
        )}
      </WingBlank>
    );
  }
}
