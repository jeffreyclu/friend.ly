import React, { Component } from 'react';
import DashboardApp from './DashboardApp.jsx';
import Logo from "./Logo.jsx";

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      fetchedUsers: false,
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