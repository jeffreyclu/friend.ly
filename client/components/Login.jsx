import React from 'react';

const Login = ({ toggleLogin }) => {
  console.log('sup');
  return (
    <div id="loginForm" className="form">
      <div className="formRow">
        <label>
          Username:
          <input type="text" className="loginUsername" />
        </label>
      </div>
      <div className="formRow">
        <label>
          Password:
          <input type="password" className="loginPassword" />
        </label>
      </div>
      <div className="formRow">
        <input type="checkbox" id="loginRemember" />
        <span>Remember Me</span>
      </div>
      <div className="formBtns">
        <button id="signupBtn">Login</button>
        <a onClick={toggleLogin}>Signup Instead</a>
      </div>
    </div>
  );
};

export default Login;
