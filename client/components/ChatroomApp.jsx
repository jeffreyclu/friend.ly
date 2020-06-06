/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import ChatMessage from './ChatMessage.jsx';
import EventContainer from './EventContainer.jsx';

class ChatroomApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const {
      messages,
      participants,
      setNewMessage,
      sendMessage,
      user,
      events,
      totalEvents,
    } = this.props;
    const messageList = messages.map((chat, index) => (
      <ChatMessage key={`${index} ${chat.createdAt}`} chat={chat} user={user} />
    ));
    return (
      <div className="chatroom">
        <div className="chatArea">
          <h3>
            Chat with: {user.name === participants[0] ? participants[1] : participants[0]}
          </h3>
          <div className="chatMessageArea" id="chatArea">
            {messages.length > 0 ? (
              messageList
            ) : (
              <span className="red">It's empty in here... why don't you break the ice?</span>
            )}
            <div
              ref={(el) => {
                this.messagesEnd = el;
              }}
            />
          </div>
          <div className="inputArea">
            <textarea
              rows="2"
              id="message"
              type="text"
              onChange={setNewMessage}
            />
            <a id="submit" onClick={sendMessage}>
              Submit
            </a>
          </div>
        </div>
        <EventContainer
          events={events}
          totalEvents={totalEvents}
          user={user}
        />
      </div>
    );
  }
}

// const ChatroomApp = ({ messages, participants, setNewMessage, sendMessage, user }) => {
//   const messageList = messages.map((chat, index) => <ChatMessage key={`${index} ${chat.createdAt}`}chat={chat} user={user} />)
//   return (
//     <div className="chatroom">
//       <h3>{ user.name === participants[0] ? participants[1] : participants[0] }</h3>
//       <div className="chatMessageArea" id="chatArea">
//         { messages.length > 0 ? messageList : <h4>It's empty in here... why don't you break the ice?</h4> }
//         <div style={{ float:"left", clear: "both" }}
//              ref={(el) => { this.messagesEnd = el; }}>
//         </div>
//       </div>
//       <div className="inputArea">
//         <textarea rows="2" id="message" type="text" onChange={setNewMessage} />
//         <a id="submit" onClick={sendMessage}>Submit</a>
//       </div>
//     </div>
//   );
// };

export default ChatroomApp;
