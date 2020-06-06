/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import SignupApp from './SignupApp.jsx';
import LoginApp from './LoginApp.jsx';
import Logo from './Logo.jsx';
import NavbarLoggedOut from './NavbarLoggedOut.jsx';
import AboutSection from './AboutSection.jsx';
import Footer from './Footer.jsx';

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginToggle: false,
      signupFull: false,
      signupWarning: undefined,
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
      totalUsers: 0,
    };
    this.focusDiv = React.createRef();

    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleSignupFull = this.toggleSignupFull.bind(this);
    this.setNewUser = this.setNewUser.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.scrollToAbout = this.scrollToAbout.bind(this);
  }

  componentDidMount() {
    const promises = [];
    let totalUsers = 0;
    const promise1 = fetch('/api/getusers')
      .then((resp) => resp.json())
      .then((data) => {
        totalUsers = data;
      });
    promises.push(promise1);
    Promise.all(promises)
      .then(() => {
        this.setState(() => ({ totalUsers }));
      });
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
      let { loginToggle } = prevState;
      loginToggle = !loginToggle;
      return { loginToggle };
    });
  }

  toggleSignupFull() {
    let { signupFull, signupWarning, newUser } = this.state;
    const promises = [];
    if (!Object.values(newUser).some((val) => val === undefined)) {
      const validatedSignupForm = true;
      if (signupFull && validatedSignupForm) {
        newUser.username = newUser.username.toLowerCase();
        newUser.avatar = 'https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png';
        const promise1 = fetch('/api/adduser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data === true) {
              signupWarning = 'Success!';
            } else {
              signupWarning = 'Sorry, that username is already taken!';
            }
          });
        promises.push(promise1);
      }
    } else if (signupFull && Object.values(newUser).some((val) => val === undefined)) {
      signupWarning = 'Error: all fields must be filled out.';
    }
    signupFull = true;
    Promise.all(promises)
      .then(() => {
        this.setState(() => {
          if (signupWarning === 'Success!') window.setTimeout(() => window.location.href='/dashboard', 1000);
          return { signupFull, signupWarning };
        });
      });
  }

  handleLogin() {
    const { loginValues } = this.state;
    let loginMessage
    let redirect = false;
    const promises = [];
    if (loginValues.username && loginValues.password) {
      loginValues.username = loginValues.username.toLowerCase();
      const promise1 = fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginValues),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.result.message === 'user found') {
            redirect = true;
            loginMessage = 'Success!';
          } else if (data.result.message === 'user not found') {
            loginMessage = 'Error, username does not exist.';
          } else if (data.result.message === 'incorrect password') {
            loginMessage = 'Error, wrong password.';
          }
        });
      promises.push(promise1);
    } else {
      loginMessage = 'Error, all fields must be filled out.';
    }
    Promise.all(promises)
      .then(() => {
        if (redirect === true) window.setTimeout(() => window.location.href = '/dashboard', 1000);
        this.setState(() => {
          return { loginMessage };
        });
      });
  }

  scrollToAbout() {
    this.focusDiv.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }

  render() {
    return (
      <>
        <div className="signupContent">
          <NavbarLoggedOut
            toggleLogin={this.toggleLogin}
            loginToggle={this.state.loginToggle}
            scrollToAbout={this.scrollToAbout}
          />
          <Logo />
          {this.state.loginToggle ? (
            <LoginApp
              toggleLogin={this.toggleLogin}
              setLogin={this.setLogin}
              handleLogin={this.handleLogin}
              loginMessage={this.state.loginMessage}
            />
          ) : (
            <SignupApp
              toggleLogin={this.toggleLogin}
              toggleSignupFull={this.toggleSignupFull}
              signupFull={this.state.signupFull}
              setNewUser={this.setNewUser}
              signupWarning={this.state.signupWarning}
            />
          )}
        </div>
        <AboutSection
          focusDiv={this.focusDiv}
          totalUsers={this.state.totalUsers}
        />
        <Footer />
      </>
    );
  }
}

export default SignupContainer;
