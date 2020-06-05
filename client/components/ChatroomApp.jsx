import React from 'react';
import ChatMessage from './ChatMessage.jsx';

const ChatroomApp = ({ messages, participants, setNewMessage, sendMessage, user }) => {
  const messageList = messages.map((chat, index) => <ChatMessage key={`${index} ${chat.createdAt}`}chat={chat} user={user} />)
  return (
    <div className="chatroom">
      <h3>{ user.name === participants[0] ? participants[1] : participants[0] }</h3>
      <div className="chatMessageArea" id="chatArea">
        { messages.length > 0 ? messageList : <h4>It's empty in here... why don't you break the ice?</h4> }
      </div>
      <div className="inputArea">
        <textarea rows="2" id="message" type="text" onChange={setNewMessage} />
        <a onClick={sendMessage}>Submit</a>
      </div>
    </div>
  );
};

export default ChatroomApp;
