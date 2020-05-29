import React, { Component } from 'react';
import Signup from './Signup.jsx';
import Login from './Login.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  toggleLogin() {
    this.setState((prevState) => {
      const newState = prevState;
      newState.login = !prevState.login;
      return newState;
    })
  }

  render() {
    return (
      <div>
        {this.state.login
          ? <Login />
          : <Signup toggleLogin={this.toggleLogin}/>}
      </div>
    );
  }
}

export default App;
