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
      events: [],
      totalEvents: undefined,
      messages: [],
      user: {},
      newMessage: {},
      fetchedChats: false,
      fetchedEvents: false,
    };
    this.setNewMessage = this.setNewMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const promises = [];
    let { user, events, totalEvents, fetchedEvents } = this.state;
    const promise1 = fetch('/checklogin')
      .then((res) => res.json())
      .then((data) => {
        user = data.currentUser;
      });
    promises.push(promise1);
    const promise2 = fetch('/event')
      .then((res) => res.json())
      .then((data) => {
        events = data.events.event;
        console.log(events);
        totalEvents = data.total_items;
        fetchedEvents = true;
      });
    promises.push(promise2);
    Promise.all(promises)
      .then(() => this.setState(() => ({ user, events, totalEvents, fetchedEvents })));
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
    const { message } = this.state.newMessage;
    const { sender } = this.state.newMessage;
    const promises = [];
    let messages = [];
    if (message !== '') {
      const promise1 = fetch('/chatroom/postmessage',
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
        });
      promises.push(promise1);
    }
    Promise.all(promises)
      .then(() => {
        this.setState(() => ({ messages }));
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
                events={this.state.events}
                totalEvents={this.state.totalEvents}
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
