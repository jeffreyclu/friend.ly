import React from 'react';

const NavbarLoggedOut = ({ toggleLogin, loginToggle, scrollToAbout }) => (
  <>
    <nav className="navbar">
      <div className="section">
        <a href="/" className="logo">F</a>
      </div>
      <div className="section">
        <a onClick={scrollToAbout}>About</a>
        <a onClick={toggleLogin}>{loginToggle ? 'Signup' : 'Login'}</a>
      </div>
    </nav>
  </>
);

export default NavbarLoggedOut;
