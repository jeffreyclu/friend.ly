import React from 'react';

const NoUsers = ({ user }) => {
  const { city, primary_interest } = user;
  return (
    <>
      <h3>We're sorry!</h3>
      <p>There are no other current users in {city} that also love {primary_interest} :(</p>
      <p>Please try again later</p>
    </>
  );
};

export default NoUsers;