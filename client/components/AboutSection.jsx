import React from 'React';

const AboutSection = ({ focusDiv }) => {
  return (
    <div id="about" ref={focusDiv}>
      <h2>About Friend.ly</h2>
      <p>
        Friend.ly aims to be the world’s most popular app for making new
        friends. It introduces you to other users in your selected location
        whose interest matches yours.
      </p>
      <p>Friend.ly is currently free to use!</p>
    </div>
  );
};

export default AboutSection;
