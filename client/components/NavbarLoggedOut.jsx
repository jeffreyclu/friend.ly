import React from 'react';

const NavbarLoggedOut = ({ toggleLogin }) => {
  return (
    <div className="section">
      <a href='/about'>About</a>
      <a onClick={toggleLogin}>Login</a>
    </div>
  );
};

export default NavbarLoggedOut;
