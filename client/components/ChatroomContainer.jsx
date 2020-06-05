/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import NavbarLoggedIn from './NavbarLoggedIn.jsx';
import ChatroomApp from './ChatroomApp.jsx';
import Footer from './Footer.jsx';

class ChatroomContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      messages: [],
      user: {},
      newMessage: {},
      fetchedChats: false,
    };
    this.setNewMessage = this.setNewMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const promises = [];
    let user = {};
    const promise1 = fetch('/checklogin')
      .then((res) => res.json())
      .then((data) => {
        user = data.currentUser;
      });
    promises.push(promise1);
    Promise.all(promises)
      .then(() => this.setState(() => ({ user })));
  }

  componentDidUpdate() {
    const promises = [];
    let messages = [];
    let participants = [];
    let fetchedChats;
    const promise1 = fetch('/chatroom/chats')
      .then((resp) => resp.json())
      .then((data) => {
        participants = data.participants;
        messages = data.messages;
      });
    promises.push(promise1);
    Promise.all(promises)
      .then(() => this.setState(() => {
        fetchedChats = true;
        return { messages, fetchedChats, participants };
      }));
  }

  setNewMessage(e) {
    const { id, value } = e.target;
    this.setState((prevState) => {
      const { user, newMessage } = prevState;
      newMessage[id] = value;
      newMessage.sender = user.name;
      return { newMessage };
    });
  }

  sendMessage() {
    this.setState((prevState) => {
      const { message, sender } = prevState.newMessage;
      let messages = [];
      if (message !== '') {
        fetch('/chatroom/postmessage',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, sender }),
          })
          .then((resp) => resp.json())
          .then((data) => {
            messages = data;
            return { messages };
          });
      }
    });
  }

  render() {
    return (
      <>
        <NavbarLoggedIn />
        {
          this.state.fetchedChats
            ? (
              <ChatroomApp
                messages={this.state.messages}
                participants={this.state.participants}
                setNewMessage={this.setNewMessage}
                sendMessage={this.sendMessage}
                user={this.state.user}
              />
            )
            : <h3>Loading...</h3>
        }
        <Footer />
      </>
    );
  }
}

export default ChatroomContainer;
