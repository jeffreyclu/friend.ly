import React, { Component } from 'react';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Logo from './Logo.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      signupFull: false,
    };
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleSignupFull = this.toggleSignupFull.bind(this);
  }

  toggleLogin() {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.login = !prevState.login;
      return newState;
    });
  }

  toggleSignupFull() {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.signupFull = !prevState.signupFull;
      return newState;
    });
  }

  render() {
    return (
      <div>
        <Logo />
        {this.state.login
          ? (
            <Login
              toggleLogin={this.toggleLogin}
            />
          )
          : (
            <Signup
              toggleLogin={this.toggleLogin}
              toggleSignupFull={this.toggleSignupFull}
              signupFull={this.state.signupFull}
            />
          )}
      </div>
    );
  }
}

export default App;
