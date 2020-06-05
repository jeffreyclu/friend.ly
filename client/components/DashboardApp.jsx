import React, { Component } from 'react';
import User from './User.jsx';
import NoUsers from './NoUsers.jsx';
import MatchedUsers from './MatchedUsers.jsx';

const DashboardApp = ({ user, potentialMatches, matchedUsers, meetUser, skipUser, idling }) => {
  return (
    <div className="dashboard">
      <h3>Welcome {user.name}</h3>
      {
        potentialMatches.length > 0
          ? (
            !idling ?
            <User 
              potentialMatches={potentialMatches}
              meetUser={meetUser}
              skipUser={skipUser}
              idling={idling}
            />
            : <h3>Checking...</h3>
          )
          : <NoUsers user={user}/>
      }
      {
        matchedUsers.length > 0 && <MatchedUsers matchedUsers={matchedUsers} user={user} />
      }
    </div>
  );
}

export default DashboardApp;
