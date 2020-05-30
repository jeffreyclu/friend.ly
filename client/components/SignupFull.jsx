import React from 'react';

const SignupFull = ({ setNewUser }) => {
  return (
    <div id="signupFormBottom">
      <div className="formRow">
        <label>
          Age:
          <input id="age" type="number" onChange={setNewUser} />
        </label>
      </div>
      <div className="formRow">
        <label>
          Pronoun:
          <select id="gender" onChange={setNewUser}>
            <option value="He">He</option>
            <option value="She">She</option>
            <option value="They">They</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>
      <div className="formRow">
        <label>
          City:
          <input id="city" type="text" onChange={setNewUser} />
        </label>
      </div>
      <div className="formRow">
        <label>
          Username:
          <input id="username" type="text" onChange={setNewUser} />
        </label>
      </div>
      <div className="formRow">
        <label>
          Password:
          <input id="password" type="password" onChange={setNewUser} />
        </label>
      </div>
    </div>
  );
}

export default SignupFull;