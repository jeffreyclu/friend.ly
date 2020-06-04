import React, { Component } from 'react';
import NavbarLoggedIn from './NavbarLoggedIn.jsx';
import ChatroomApp from './ChatroomApp.jsx';

class ChatroomContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      messages: [],
      user: {},
    };
  }

  componentDidMount() {
    fetch('/chatroom/chats')
      .then((resp) => resp.json())
      .then((data) => {
        this.setState(() => {
          const { participants, messages } = data;
          return ({ participants, messages });
        });
      });
  }

  render() {
    return (
      <div>
        <NavbarLoggedIn />
        <h3>Chatroom</h3>
        <ChatroomApp
          messages={this.state.messages}
          participants={this.state.participants}
        />
      </div>
    );
  }
}

export default ChatroomContainer;
