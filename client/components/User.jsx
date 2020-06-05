import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMatch: {},
      fetched: false,
    };
  }

  componentDidMount() {
    fetch('/api/getuserinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: this.props.potentialMatches[0] }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data) {
          this.setState(() => {
            const currentMatch = data;
            const fetched = true;
            return { currentMatch, fetched };
          });
        }
      });
  }

  componentDidUpdate() {
    fetch('/api/getuserinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: this.props.potentialMatches[0] }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data) {
          this.setState(() => {
            const currentMatch = data;
            const fetched = true;
            return { currentMatch, fetched };
          });
        }
      });
  }

  render() {
    const { meetUser, skipUser, idling } = this.props;
    const {
      name,
      age,
      city,
      avatar,
      primary_interest,
    } = this.state.currentMatch;
    return (
      <>
        {this.state.fetched ? (
          <div className="matchedUserContainer">
            <div className="matchedUser">
              <div className="avatar">
                <img src={avatar} className="avatarNew" />
              </div>
              <div className="matchedHeader">
                <span className="matchedUserName">
                  {name} {age}
                </span>
                <span className="matchedCity">{city}</span>
              </div>
              <div className="matchedDesc">
                <p>
                  {name} also loves {primary_interest.toLowerCase()}
                </p>
              </div>
            </div>
            {idling === false && (
              <div className="arrow left" onClick={meetUser}>
                Meet
              </div>
            )}
            {idling === false && (
              <div className="arrow right" onClick={skipUser}>
                Skip
              </div>
            )}
          </div>
        ) : (
          <h3>Getting new event buddies for you!</h3>
        )}
      </>
    );
  }
}

export default User;
