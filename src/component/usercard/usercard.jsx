import React, { Component } from "react";
import PropTypes from "prop-types";
import { WingBlank, Card, WhiteSpace } from "antd-mobile";
import { withRouter } from "react-router-dom";

@withRouter
export default class UserCard extends Component {
  handleClick(v) {
    console.log(v);

    this.props.history.push(`/chat/${v.user}`);
  }

  render() {
    return (
      <WingBlank>
        {this.props.userlist.map(
          val =>
            val.avatar ? (
              <div key={val._id} onClick={() => this.handleClick(val)}>
                <WhiteSpace />
                <Card >
                  <Card.Header
                    title={val.user}
                    thumb={require(`../img/${val.avatar}.png`)}
                    extra={<span>{val.title}</span>}
                  />
                  <Card.Body>
                    {val.desc}
                    {val.type === "boss" ? (
                      <div>公司：{val.company}</div>
                    ) : null}
                    {val.type === "boss" ? <div>薪资：{val.salary}</div> : null}
                  </Card.Body>
                  <WhiteSpace />
                </Card>
              </div>
            ) : null
        )}
      </WingBlank>
    );
  }
}

UserCard.propTypes = {
  userlist: PropTypes.array.isRequired
};
