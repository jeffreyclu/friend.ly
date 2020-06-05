import React, { Component } from 'react';

const MatchedUsers = ({ matchedUsers, user }) => {
  console.log(matchedUsers)
  const matches = matchedUsers.map((match, index) => (
    <div className='match' key={match}>
      <a href={`/chatroom/check/${user._id}/${match._id}`} className={match.isMatched ? "matchedName": "matchName"}>{match.name}</a>
      <img key={match.avatar} src={match.avatar} className='matchAvatar' />
    </div>
  ));
  return (
    <div className="matches">
      <h4>Your Matches</h4>
      {matches}
    </div>
  );
};

export default MatchedUsers;
