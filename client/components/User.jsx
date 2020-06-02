import React from 'react'

const User = ({ matchedUsers, matchedUserIndex }) => {
  const currentMatch = matchedUsers[matchedUserIndex];
  const { name, age, gender, city, primary_interest } = currentMatch;
  // TODO add ability to swipe left and right
  // TODO add avatars
  return (
    <div className="matchedUserContainer">
      <div className="matchedUser">
        <div className="avatar"></div>
        <div className="matchedHeader">
          <span className="matchedUserName">
            {name}, {age}
          </span>
          <span className="matchedCity">{city}</span>
        </div>
        <div className="matchedDesc">
          <p>
            {gender} also loves {primary_interest.toLowerCase()}
          </p>
        </div>
      </div>
      <div className="arrow left">Meet</div>
      <div className="arrow right">Skip</div>
    </div>
  );
};

export default User;