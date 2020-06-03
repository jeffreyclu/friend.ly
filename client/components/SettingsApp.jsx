import React from 'react';

// TODO add ability to change user's city and primary interest
const SettingsApp = ({ user, newUser, status, setNewUser, handleSettingsChange }) => {
  const { city, primary_interest } = user;
  return (
    <div>
      <h3>Settings</h3>
      <div className="formRow">
        <label className="previous">
          Current City:
          <span className="previous">
            {" " + city}
          </span>
        </label>
      </div>
      <div className="formRow">
        <label>
          New City:
          <input type="text" id="city" onChange={setNewUser} />
        </label>
      </div>
      <div className="formRow">
        <label className="previous">
          Current Interest:
          <span className="previous">
            {" " + primary_interest}
          </span>
        </label>
      </div>
      <label>
        New Interest:
        <select id="primary_interest" onChange={setNewUser} >
              <option value="Live Music">Live Music</option>
              <option value="Live Sports">Live Sports</option>
              <option value="Art Shows">Art Shows</option>
              <option value="Dancing">Dancing</option>
              <option value="Watching Movies">Watching Movies</option>
              <option value="Eating Out">Eating Out</option>
            </select>
      </label>
      
      <div className="settingsFormBtns">
      <span className="warning">{status}</span>
        <button onClick={handleSettingsChange}>Apply Changes</button>
        <a href='/dashboard'>Cancel</a>
      </div>
    </div>
  );
};

export default SettingsApp;
