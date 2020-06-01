import React, { Component } from 'react';
import DashboardApp from './DashboardApp.jsx';
import Logo from './Logo.jsx';
import NavbarLoggedIn from './NavbarLoggedIn.jsx';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchedUsers: [], // TODO do something with these users
      matchedUserIndex: 0,
      user: {},
      fetchedUsers: false,
    };
  }

  componentDidMount() {
    fetch('/checklogin')
      .then((res) => res.json())
      .then((data) => {
        return this.setState({
          user: data.currentUser,
        });
      });
    fetch('/api/matchusers')
      .then((res) => res.json())
      .then((matchedUsers) => {
        console.log(matchedUsers)
        if (!Array.isArray(matchedUsers)) matchedUsers = [];
        return this.setState({
          matchedUsers,
          fetchedUsers: true,
        });
      })
      .catch((err) => console.log(
        'DashboardApp.componentDidMount: get users: ERROR: ',
        err,
      ));
    this.setState()
  }

  render() {
    return (
      <div>
        <NavbarLoggedIn />
        <Logo />
        {this.state.fetchedUsers ? (
          <DashboardApp user={this.state.user} matchedUsers={this.state.matchedUsers} matchedUserIndex={this.state.matchedUserIndex} />
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
