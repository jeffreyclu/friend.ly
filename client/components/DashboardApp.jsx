/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import User from './User.jsx';
import NoUsers from './NoUsers.jsx';
import MatchedUsers from './MatchedUsers.jsx';

const DashboardApp = ({
  user, potentialMatches, matchedUsers, meetUser, skipUser, idling,
}) => (
  <div className="dashboard">
    <h3>
      Welcome
      {' '}
      {user.name}
    </h3>
    {
        potentialMatches.length > 0
          ? (
            !idling
              ? (
                <User
                  potentialMatches={potentialMatches}
                  meetUser={meetUser}
                  skipUser={skipUser}
                  idling={idling}
                />
              )
              : <span>Please wait, we're getting a new event buddy for you!</span>
          )
          : <NoUsers user={user} />
      }
    {
        matchedUsers.length > 0 && <MatchedUsers matchedUsers={matchedUsers} user={user} />
      }
  </div>
);

export default DashboardApp;
