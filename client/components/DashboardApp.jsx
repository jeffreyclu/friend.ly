import React, { Component } from 'react';
import User from './User.jsx';
import NoUsers from './NoUsers.jsx';

const DashboardApp = ({ user, matchedUsers, matchedUserIndex }) => {
  return (
    <div className="dashboard">
      <h3>Welcome {user.name}</h3>
      {
        matchedUsers.length > 0
          ? (
            <User 
              matchedUsers={matchedUsers}
              matchedUserIndex={matchedUserIndex}
            />
          )
          : <NoUsers user={user}/>
      }
    </div>
  );
}

export default DashboardApp;
