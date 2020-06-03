import React, { Component } from 'react';
import DashboardApp from './DashboardApp.jsx';
import NavbarLoggedIn from './NavbarLoggedIn.jsx';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      potentialMatches: [],
      matchedUsers: [],
      user: {},
      fetchedUsers: false,
      fetchedMatches: false,
      idling: false,
    };
    this.meetUser = this.meetUser.bind(this);
    this.skipUser = this.skipUser.bind(this);
  }

  componentDidMount() {
    const promises = [];
    let user = {};
    let potentialMatches = [];
    let matchedUsers = [];
    let fetchedUsers;
    const promise1 = fetch('/checklogin')
      .then((res) => res.json())
      .then((data) => {
        user = data.currentUser;
        potentialMatches = user.potentialMatches;
        matchedUsers = user.matchedUsers;
        fetchedUsers = true;
      });
    promises.push(promise1);
    const promise2 = fetch('/api/getpotentials')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.potentialMatches)) potentialMatches = data.potentialMatches;
        fetchedUsers = true;
      });
    promises.push(promise2);
    Promise.all(promises)
      .then(() => {
        this.setState((prevState) => ({
          user, potentialMatches, fetchedUsers, matchedUsers,
        }));
      });
  }

  meetUser() {
    this.setState((prevState) => {
      const { potentialMatches, matchedUsers } = prevState;
      const desiredUser = potentialMatches.shift();
      matchedUsers.push(desiredUser);
      let idling = true;
      const promises = [];
      const promise1 = fetch('/api/addmatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchedUsers),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
      promises.push(promise1);
      const promise2 = fetch('/api/syncpotentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(potentialMatches),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
      promises.push(promise2);
      Promise.all(promises)
        .then(() => {
          this.setState(() => {
            idling = false;
            return { idling };
          });
        });
      return { potentialMatches, matchedUsers, idling };
    });
  }

  skipUser() {
    this.setState((prevState) => {
      const { potentialMatches } = prevState;
      let idling = true;
      potentialMatches.shift();
      fetch('/api/syncpotentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(potentialMatches),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data, 'here!!!');
          this.setState(() => {
            idling = false;
            return { idling };
          });
        });
      return { potentialMatches, idling };
      // ensure that the async call is done before we allow the user to click (make the button unclickable until data is ready)
    });
  }

  render() {
    return (
      <div>
        <NavbarLoggedIn />
        {this.state.fetchedUsers ? (
          <DashboardApp
            user={this.state.user}
            potentialMatches={this.state.potentialMatches}
            matchedUsers={this.state.matchedUsers}
            meetUser={this.meetUser}
            skipUser={this.skipUser}
            idling={this.state.idling}
          />
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
