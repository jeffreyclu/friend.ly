import React from 'react';
import SignupFull from './SignupFull.jsx';

const Signup = (props) => {
  const {
    toggleLogin,
    toggleSignupFull,
    signupFull,
    setNewUser,
    validateWarning,
  } = props;
  return (
    <div id="signupForm" className="form">
      <div>
        <div className="formRow">
          <label>
            My name is:
            <input id="name" type="text" onChange={setNewUser} />
          </label>
        </div>
        <div className="formRow">
          <label>
            and I love:
            <select id="primary_interest" onChange={setNewUser}>
              <option value="Live Music">Live Music</option>
              <option value="Live Sports">Live Sports</option>
              <option value="Art Shows">Art Shows</option>
              <option value="Dancing">Dancing</option>
              <option value="Watching Movies">Watching Movies</option>
              <option value="Eating Out">Eating Out</option>
            </select>
          </label>
        </div>
        {signupFull && <SignupFull setNewUser={setNewUser} />}
        
      </div>
      {validateWarning && <span className="warning">Error: all fields must be filled in.</span>}
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
