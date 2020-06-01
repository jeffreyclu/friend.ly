import React, { Component } from 'react';
import User from './User.jsx';

const DashboardApp = ({ user, matchedUsers, matchedUserIndex }) => {
  return (
    <div className="dashboard">
      <User
        user={user}
        matchedUsers={matchedUsers}
        matchedUserIndex={matchedUserIndex}
      />
    </div>
  );
}

export default DashboardApp;
