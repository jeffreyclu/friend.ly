import React, { Component } from 'react';
import NavbarLoggedIn from './NavbarLoggedIn.jsx';

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
      .then((data) => { console.log(data); });
  }

  render() {
    return (
      <div>
        <NavbarLoggedIn />
        <h3>Chatroom</h3>
      </div>
    );
  }
}

export default ChatroomContainer;
