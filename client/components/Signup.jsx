import React, { Component } from 'react';

const Signup = ({ toggleLogin, signupFull }) => {
  const user = {};
  return (
    <div className="signupForm">
      <label className="signupLabel">
        My name is:
        <input type="text" className="signupName" />
      </label>
      <label className="signupLabel">
        and I am interested in:
        <select id="myList" className="signupInterest">
          <option value="1">Live Music</option>
          <option value="2">Live Sports</option>
          <option value="3">Art Shows</option>
          <option value="4">Dancing</option>
          <option value="5">Watching Movies</option>
          <option value="6">Eating Out</option>
        </select>
      </label>
      <div className="formBtns">
        <button className="signupBtn">Signup</button>
        <a onClick={ toggleLogin }>Login Instead</a>
      </div>
    </div>
  );
};

export default Signup;