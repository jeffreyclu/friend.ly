import React from 'react';
import SignupFull from './SignupFull.jsx';

const Signup = ({ toggleLogin, toggleSignupFull, signupFull }) => {
  return (
    <div id="signupForm" className="form">
      <div id="signupFormStart">
        <div className="formRow">
          <label>
            My name is:
            <input id="name" type="text" className="signupName" />      
          </label>
        </div>
        <div className="formRow">
          <label>
            and I love:
            <select id="primaryInterest">
              <option value="1">Live Music</option>
              <option value="2">Live Sports</option>
              <option value="3">Art Shows</option>
              <option value="4">Dancing</option>
              <option value="5">Watching Movies</option>
              <option value="6">Eating Out</option>
            </select>
          </label>
        </div>
        {signupFull && <SignupFull />}
      </div>

      <div className="formBtns">
        <button id="signupBtn" onClick={toggleSignupFull}>
          Signup
        </button>
        <a onClick={toggleLogin}>Login Instead</a>
      </div>
    </div>
  );
};

export default Signup;