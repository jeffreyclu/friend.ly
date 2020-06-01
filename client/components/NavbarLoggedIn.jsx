import React from 'react';

const NavbarLoggedIn = () => {
  return (
    <div className="section">
      <a href="/dashboard">Dashboard</a>
      <a href="/settings">Settings</a>
      <a href="/logout">Logout</a>
      {/* <div className="dropdown">
              <div className="profile" onClick={this.profileDropdownToggle}></div>
              { this.state.profileToggle && <NavbarDropdown links={this.state.profileLinks} />}
            </div> */}
    </div>
  );
};

export default NavbarLoggedIn;
