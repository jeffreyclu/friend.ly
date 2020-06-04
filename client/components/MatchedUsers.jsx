import React from 'react';

const MatchedUsers = ({ matchedUsers, user }) => {
  const matches = matchedUsers.map((match) => (
    <div className='match' key={match._id}>
      <a href={`/chatroom/check/${user._id}/${match._id}`} key={match.name} className={match.isMatched ? "matchedName": "matchName"}>{match.name}</a>
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
