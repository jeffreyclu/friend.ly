/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
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
        this.setState(() => ({
          user, potentialMatches, fetchedUsers, matchedUsers,
        }));
      });
  }

  meetUser() {
    this.setState(() => {
      let idling = true;
      return { idling };
    });
    const { potentialMatches, matchedUsers } = this.state;
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
    });
    promises.push(promise1);
    const promise2 = fetch('/api/syncpotentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(potentialMatches),
    });
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
          return { potentialMatches, matchedUsers, idling };
        });
      });
  }

  skipUser() {
    this.setState(() => {
      let idling = true;
      return { idling };
    });
    const { potentialMatches } = this.state;
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
      .then(() => {
        this.setState(() => {
          idling = false;
          return { potentialMatches, idling };
        });
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
