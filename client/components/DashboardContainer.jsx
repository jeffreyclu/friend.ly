import React, { Component } from 'react';
import DashboardApp from './DashboardApp.jsx';
import Logo from './Logo.jsx';
import NavbarLoggedIn from './NavbarLoggedIn.jsx';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [], // TODO do something with these users
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
    this.setState()
  }

  render() {
    return (
      <div>
        <NavbarLoggedIn />
        <Logo />
        {this.state.fetchedUsers ? (
          <DashboardApp user={this.state.user} />
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
