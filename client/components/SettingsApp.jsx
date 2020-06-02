import React from 'react';

// TODO add ability to change user's city and primary interest
const SettingsApp = ({ user }) => {
  const { city, primary_interest } = user;
  return (
    <>
      <h3>Settings</h3>
      <label>
        Current City:
        {city}
      </label>
      <label>
        New City:
        <input type="text" />
      </label>
      <label>
        Current Interest:
        {primary_interest}
      </label>
      <label>
        New Interest:
        <input type="text" />
      </label>
      <a href='/dashboard'>Apply Changes</a>
      <a href='/dashboard'>Cancel</a>
    </>
  );
};

export default SettingsApp;
