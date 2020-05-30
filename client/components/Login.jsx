import React from 'react';

const Login = ({ toggleLogin, setLogin, handleLogin, loginMessage }) => {
  console.log(loginMessage, 'login message')
  return (
    <div id="loginForm" className="form">
      <div className="formRow">
        <label>
          Username:
          <input id="username" type="text" onChange={setLogin} />
        </label>
      </div>
      <div className="formRow">
        <label>
          Password:
          <input id="password" type="password" onChange={setLogin} />
        </label>
      </div>
      <div className="formRow">
        <input type="checkbox" id="loginRemember" />
        <span>Remember Me</span>
      </div>
      {loginMessage && <span className="warning">{loginMessage}</span>}
      <div className="formBtns">
        <button id="signupBtn" onClick={handleLogin}>Login</button>
        <a onClick={toggleLogin}>Signup Instead</a>
      </div>
    </div>
  );
};

export default Login;
