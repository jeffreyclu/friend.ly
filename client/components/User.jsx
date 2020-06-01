import React from 'react'

const User = ({ user, matchedUsers, matchedUserIndex }) => {
  const currentUser = matchedUsers[matchedUserIndex];
  const { name, age, gender, city, primary_interest } = currentUser;
  // TODO check matched users is > 0
  // TODO add ability to swipe left and right
  // TODO separate current user card and matched user cards
  return (
    <div>
      <h3>Welcome {user.name}</h3>
      <h3>Meet {name}</h3>
      <h3>{gender} is {age} years old from {city}</h3>
      <h3>{gender} also loves {primary_interest.toLowerCase()}</h3>
      <button>Meet {name}</button>
      <button>Skip {name}</button>
    </div>
  ); 
}

export default User;