import React, { Component } from "react";
import { List, InputItem, NavBar, Icon, Grid } from "antd-mobile";
import { connect } from "react-redux";
import { getMsgList, sendMsg, recvMsg, readMsg } from "../../redux/chat.redux";
import { getChatId } from "../../util";

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg, readMsg }
)
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", msg: [] };
  }

  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }

  componentWillUnmount() {
    const to = this.props.match.params.user;
    this.props.readMsg(to);
  }

  fixCarousel() {
    setTimeout(function() {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }

  handleSubmit() {
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({
      text: "",
      showEmoji: false
    });
  }

  render() {
    const emoji = "😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 "
      .split(" ")
      .filter(v => v)
      .map(v => ({ text: v }));

    const Item = List.Item;
    const userid = this.props.match.params.user;
    const users = this.props.chat.users;
    const chatid = getChatId(userid, this.props.user._id);
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid);

    if (!users[userid]) return null;

    return (
      <div id="chat-page">
        <NavBar
          model="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
        >
          {users[userid].name}
        </NavBar>

        {chatmsgs.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`);
          return v.from === userid ? (
            <List key={v._id}>
              <Item thumb={avatar}>{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item
                extra={<img src={avatar} alt="avatar" />}
                className="chat-me"
              >
                {v.content}
              </Item>
            </List>
          );
        })}

        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => {
                this.setState({ text: v });
              }}
              onKeyUp={e => {
                e.keyCode === 13 && this.handleSubmit();
              }}
              extra={
                <div>
                  <span
                    style={{
                      marginRight: "10px",
                      height: "25px",
                      lineHeight: "25px"
                    }}
                    onClick={() => {
                      this.setState({ showEmoji: !this.state.showEmoji });
                      this.fixCarousel();
                    }}
                  >
                    🙂
                  </span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            />
          </List>
          {this.state.showEmoji ? (
            <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={el => {
                this.setState({
                  text: this.state.text + el.text
                });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}