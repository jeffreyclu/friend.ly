import React from 'react';

const SignupFull = () => {
  return (
    <div id="signupFormBottom">
      <div className="formRow">
        <label>
          Age:
          <input id="age" type="number" />
        </label>
      </div>
      <div className="formRow">
        <label>
          City:
          <select id="city">
            <option value="1">New York City</option>
            <option value="2">Los Angeles</option>
          </select>
        </label>
      </div>
      <div className="formRow">
        <label>
          Username:
          <input id="username" type="text" />
        </label>
      </div>
      <div className="formRow">
        <label>
          Password:
          <input id="password" type="password" />
        </label>
      </div>
    </div>
  );
}

export default SignupFull;