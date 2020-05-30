import React, { Component } from 'react';
import DashboardApp from './DashboardApp.jsx';

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
        {this.state.fetchedUsers
          ? <DashboardApp />
          : <h1>Loading...</h1>}
      </div>
    );
  }
}

export default DashboardContainer;
