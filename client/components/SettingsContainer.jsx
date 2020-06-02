import React, { Component } from 'react';
import NavbarLoggedIn from './NavbarLoggedIn.jsx';
import SettingsApp from './SettingsApp.jsx';

class SettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loaded: false,
    };
  }

  componentDidMount() {
    fetch('/checklogin')
      .then((res) => res.json())
      .then((data) => this.setState({
        user: data.currentUser,
        loaded: true,
      }));
  }

  render() {
    return (
      <div>
        <NavbarLoggedIn />
        <div className="settings">
          {
            this.state.loaded
              ? <SettingsApp user={this.state.user} />
              : <h3>Loading...</h3>
          }
        </div>
      </div>
    );
  }
}

export default SettingsContainer;
