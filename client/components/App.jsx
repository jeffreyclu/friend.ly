import React, { Component } from 'react';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Logo from './Logo.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      signupFull: false,
      validatedSignupForm: false,
      validateWarning: false,
      newUser: {
        name: undefined,
        age: undefined,
        gender: 'He',
        city: 'New York City',
        primary_interest: 'Live Music',
        username: undefined,
        password: undefined,
      },
      loginValues: {
        username: undefined,
        password: undefined,
      },
      loginMessage: undefined,
    };
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleSignupFull = this.toggleSignupFull.bind(this);
    this.setNewUser = this.setNewUser.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  setNewUser(e) {
    const { id, value } = e.target;
    this.setState((prevState) => {
      const newUser = { ...prevState.newUser };
      newUser[id] = value;
      return { newUser };
    });
  }

  setLogin(e) {
    const { id, value } = e.target;
    this.setState((prevState) => {
      const loginValues = { ...prevState.loginValues };
      loginValues[id] = value;
      return { loginValues };
    });
  }

  toggleLogin() {
    this.setState((prevState) => {
      let login = { ...prevState.login };
      login = !prevState.login;
      return { login };
    });
  }

  toggleSignupFull() {
    this.setState((prevState) => {
      let {
        signupFull, validatedSignupForm, validateWarning, newUser,
      } = prevState;
      if (!Object.values(newUser).some((val) => val === undefined)) {
        validatedSignupForm = true;
        if (signupFull && validatedSignupForm) {
          newUser.username = newUser.username.toLowerCase();
          fetch('/api/adduser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          })
            .then((resp) => resp.json())
            .then((data) => {
              if (data === true) {
                window.location.href = '/dashboard';
              } else {
                alert('Error, user already exists'); // TODO fix error message handling
              }
            });
        }
      } else if (signupFull && Object.values(newUser).some((val) => val === undefined)) {
        validateWarning = true;
      }
      signupFull = true;
      return { signupFull, validatedSignupForm, validateWarning };
    });
  }

  handleLogin() {
    this.setState((prevState) => {
      let { loginValues, loginMessage } = prevState;
      if (loginValues.username && loginValues.password) {
        loginValues.username = loginValues.username.toLowerCase();
        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginValues),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.result.message === 'user found') {
              window.location.href = '/dashboard';
            }
          });
      }
      loginMessage = 'Error, please try again.'; // TODO fix login error message handling
      return { loginMessage };
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Logo />
        {this.state.login ? (
          <Login
            toggleLogin={this.toggleLogin}
            setLogin={this.setLogin}
            handleLogin={this.handleLogin}
            loginMessage={this.state.loginMessage}
          />
        ) : (
          <Signup
            toggleLogin={this.toggleLogin}
            toggleSignupFull={this.toggleSignupFull}
            signupFull={this.state.signupFull}
            setNewUser={this.setNewUser}
            validateWarning={this.state.validateWarning}
          />
        )}
      </div>
    );
  }
}

export default App;
