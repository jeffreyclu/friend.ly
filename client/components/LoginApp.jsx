/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */

import React from 'react';

const LoginApp = ({ toggleLogin, setLogin, handleLogin, loginMessage }) => {
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
      {loginMessage && <span className="warning">{loginMessage}</span>}
      <div className="formBtns">
        <button id="signupBtn" onClick={handleLogin}>Login</button>
        <a onClick={toggleLogin}>Signup Instead</a>
      </div>
    </div>
  );
};

export default LoginApp;
