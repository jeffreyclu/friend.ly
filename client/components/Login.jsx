import React from 'react';

const Login = ({ toggleLogin }) => {
  console.log('sup');
  return (
    <div className="loginForm">
      <label className="loginLabel">
        Username:
        <input type="text" className="loginUsername" />
      </label>
      <label className="loginLabel">
        Password:
        <input type="password" className="loginPassword" />
      </label>
      <div className="formBtns">
        <button className="signupBtn">Login</button>
        <a onClick={ toggleLogin }>Signup Instead</a>
      </div>
    </div>
  );
};

export default Login;
