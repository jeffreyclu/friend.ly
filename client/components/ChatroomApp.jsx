import React from 'react';
import ChatMessage from './ChatMessage.jsx';

const ChatroomApp = ({ messages, participants, setNewMessage, sendMessage, user }) => {
  const participantList = participants.map((name, index) => <h3>{name}</h3>);
  const messageList = messages.map((chat, index) => <ChatMessage key={`${index} ${chat.createdAt}`}chat={chat} user={user} />)
  return (
    <div className="chatroom">
      <h3>Chatroom: {participants[0] + " - " + participants[1]}</h3>
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
