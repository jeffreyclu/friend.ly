import React from 'react';

const NavbarLoggedOut = ({ toggleLogin, loginToggle }) => (
  <>
    <nav className="navbar">
      <div className="section">
        <a href="/" className="logo">F</a>
      </div>
      <div className="section">
        <a href="/about">About</a>
        <a onClick={toggleLogin}>{loginToggle ? 'Signup' : 'Login'}</a>
      </div>
    </nav>
  </>
);

export default NavbarLoggedOut;
