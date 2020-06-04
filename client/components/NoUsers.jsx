import React from 'react';

const NoUsers = ({ user }) => {
  const { city, primary_interest } = user;
  return (
    <>
      <h4>We're sorry!</h4>
      <p>There are no other current users in {city} that also love {primary_interest} &#128557;</p>
      <a href='/settings'>Adjust settings</a>
    </>
  );
};

export default NoUsers;