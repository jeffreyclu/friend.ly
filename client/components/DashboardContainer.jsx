import React, { Component } from 'react';
import DashboardApp from './DashboardApp.jsx';
import Logo from "./Logo.jsx";
import Navbar from './Navbar.jsx';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      fetchedUsers: false,
      loggedIn: true,
    };
  }

  componentDidMount() {
    fetch('/api/getusers')
      .then((res) => res.json())
      .then((users) => {
        if (!Array.isArray(users)) users = [];
        return this.setState({
          users,
          fetchedUsers: true,
        });
      })
      .catch((err) => console.log(
        'DashboardApp.componentDidMount: get users: ERROR: ',
        err,
      ));
  }

  render() {
    return (
      <div>
        <Navbar loggedIn={this.state.loggedIn} />
        <Logo />
        {this.state.fetchedUsers ? (
          <DashboardApp />
        ) : (
          <div className="dashboard">
            <span>Loading...</span>
          </div>
        )}
      </div>
    );
  }
}

export default DashboardContainer;
