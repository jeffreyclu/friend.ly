import React from 'react'

const User = ({ potentialMatches, meetUser, skipUser, idling }) => {
  const currentMatch = potentialMatches[0];
  const { name, age, gender, city, primary_interest, avatar } = currentMatch;
  // TODO add ability to swipe left and right
  // TODO add avatars
  return (
    <div className="matchedUserContainer">
      <div className="matchedUser">
        <div className="avatar">
          <img src={avatar} className="avatarNew"/>
        </div>
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
      {
        idling === false && <div className="arrow left" onClick={meetUser}>Meet</div>
      }
      {
        idling === false && <div className="arrow right" onClick={skipUser}>Skip</div>
      }
    </div>
  );
};

export default User;