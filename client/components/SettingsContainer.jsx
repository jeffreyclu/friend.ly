import React, { Component } from 'react';
import NavbarLoggedIn from './NavbarLoggedIn.jsx';
import SettingsApp from './SettingsApp.jsx';
import Footer from './Footer.jsx';

class SettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loaded: false,
      status: '',
      newUser: {
        city: '',
        primary_interest: 'Live Music',
      },
    };
    this.setNewUser = this.setNewUser.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }

  componentDidMount() {
    fetch('/checklogin')
      .then((res) => res.json())
      .then((data) => this.setState({
        user: data.currentUser,
        loaded: true,
      }));
  }

  setNewUser(e) {
    const { id, value } = e.target;
    this.setState((prevState) => {
      const newUser = { ...prevState.newUser };
      newUser[id] = value;
      return { newUser };
    });
  }

  handleSettingsChange() {
    this.setState((prevState) => {
      let { user, newUser, status } = prevState;
      console.log(user, newUser);
      if (user && newUser.city && newUser.primary_interest) {
        fetch('/api/edituser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user, newUser }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.message === 'success') window.location.href = '/';
            newUser = {
              city: '',
              primary_interest: 'Live Music',
            };
            status = 'Success!';
            return { newUser };
          });
      } else {
        status = 'Error, all fields must be filled in';
        return { status };
      }
    });
  }

  render() {
    return (
      <>
        <NavbarLoggedIn />
        <div className="settingsForm">
          {
            this.state.loaded
              ? (
                <SettingsApp
                  user={this.state.user}
                  newUser={this.state.newUser}
                  status={this.state.status}
                  handleSettingsChange={this.handleSettingsChange}
                  setNewUser={this.setNewUser}
                />
              )
              : <h3>Loading...</h3>
          }
        </div>
        <Footer />
      </>
    );
  }
}

export default SettingsContainer;
