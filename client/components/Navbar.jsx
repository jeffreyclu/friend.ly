import React, { Component } from 'react';
import NavbarDropdown from './NavbarDropdown.jsx';
import NavbarLoggedIn from './NavbarLoggedIn.jsx';
import NavbarLoggedOut from './NavbarLoggedOut.jsx';

const Navbar = ({ toggleLogin, loggedIn}) => {
  return (
    <>
      <nav className="navbar">
        <div className="section">
          <a href="/"><span className="logo">F</span></a>
        </div>
        {
          loggedIn === true
            ? <NavbarLoggedIn />
            : <NavbarLoggedOut toggleLogin={toggleLogin} />
        }
      </nav>
    </>
  );
}

export default Navbar;
