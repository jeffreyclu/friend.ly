import React from 'react';

const MatchedUsers = ({ matchedUsers }) => {
  const matches = matchedUsers.map((user) => <span key={user.name}>{user.name}</span>);
  return (
    <div className="matches">
      {matches}
    </div>
  );
};

export default MatchedUsers;
