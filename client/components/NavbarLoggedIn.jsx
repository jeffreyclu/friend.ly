import React from 'react';

const NavbarLoggedIn = () => {
  return (
    <>
      <nav className="navbar">
        <div className="section">
          <a href="/" className="logo">F</a>
        </div>
        <div className="section">
          <a href="/dashboard">Dashboard</a>
          <a href="/settings">Settings</a>
          <a href="/logout">Logout</a>
          {/* <div className="dropdown">
              <div className="profile" onClick={this.profileDropdownToggle}></div>
              { this.state.profileToggle && <NavbarDropdown links={this.state.profileLinks} />}
            </div> */}
        </div>
      </nav>
    </>
    
  );
};

export default NavbarLoggedIn;
