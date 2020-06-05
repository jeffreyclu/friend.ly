/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */

import React from 'react';

const NavbarDropdown = ({ links }) => {
  const linksList = links.map((link) => <a href={`/${link.toLowerCase()}`} key={`${link}`}>{link}</a>);
  return (
    <>
      {linksList}
    </>
  );
};

export default NavbarDropdown;
