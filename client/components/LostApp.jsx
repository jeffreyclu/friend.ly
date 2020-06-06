import React, { Component } from 'react';

class LostApp extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <div className="lost">
          <h3>Oh dear...looks like we took a wrong turn.</h3>
          <a href='/'>Back to safety?</a>
        </div>
      </>
    );
  }
}

export default LostApp;
