import React from 'react';

const MatchedUsers = ({ matchedUsers }) => {
  const matches = matchedUsers.map((user) => (
    <div className='match' key={user._id}>
      <a key={user.name} className='matchName'>{user.name}</a>
      <img key={user.avatar} src={user.avatar} className='matchAvatar' />
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
