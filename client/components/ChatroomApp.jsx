import React from 'react';

const ChatroomApp = ({ messages, participants }) => {
  const participantList = participants.map((name) => <h3 key={name}>{name}</h3>);
  return (
    <>
      { participants && participantList }
    </>
  );
};

export default ChatroomApp;
