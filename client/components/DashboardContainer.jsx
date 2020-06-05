import React, { Component } from 'react';
import DashboardApp from './DashboardApp.jsx';
import NavbarLoggedIn from './NavbarLoggedIn.jsx';
import Footer from './Footer.jsx';

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
    const promise1 = fetch('/checklogin');
    promises.push(promise1);
    const promise2 = fetch('/api/getpotentials')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.potentialMatches)) potentialMatches = data.potentialMatches;
        if (Array.isArray(data.matchedUsers)) matchedUsers = data.matchedUsers;
        fetchedUsers = true;
      });
    promises.push(promise2);
    Promise.all(promises)
      .then(() => {
        this.setState(() => ({
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
      const promise3 = fetch('/api/checkformatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(desiredUser),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.message === 'matched') {
            matchedUsers.forEach((match) => {
              if (match._id === desiredUser._id) match.isMatched = true;
            });
          }
        });
      promises.push(promise3);
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
    });
  }
  
  render() {
    return (
      <>
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
        <Footer />
      </>
    );
  }
}

export default DashboardContainer;
