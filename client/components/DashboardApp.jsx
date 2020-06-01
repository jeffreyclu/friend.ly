import React, { Component } from 'react';
import User from './User.jsx';

const DashboardApp = ({ user }) => {
  return (
    <div className="dashboard">
      <User user={user} />
    </div>
  );
}

export default DashboardApp;
