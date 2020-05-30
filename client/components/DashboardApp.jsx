import React, { Component } from 'react';
import User from './User.jsx';
import Logo from './Logo.jsx';

class DashboardApp extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Logo />
        <User />
      </div>
    );
  }
}

export default DashboardApp;
