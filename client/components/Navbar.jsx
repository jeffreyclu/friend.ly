import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <nav className="navbar">
          <a href='/'>Home</a>
          <a href='/dashboard'>Dashboard</a>
          <a>Profile</a>
          <a href='/logout'>Logout</a>
        </nav>
      </>
    );
  }
}

export default Navbar;
