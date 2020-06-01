import React, { Component } from 'react';
import User from './User.jsx';

class DashboardApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div className="dashboard">
        <User />
      </div>
    );
  }
}

export default DashboardApp;
