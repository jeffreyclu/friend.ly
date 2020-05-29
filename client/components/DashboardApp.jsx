import React, { Component } from 'react';

class DashboardApp extends Component {
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
          ? <h1>{this.state.users[0]["name"]}</h1>
          : <h1>Loading...</h1>}
      </div>
    );
  }
}

export default DashboardApp;
