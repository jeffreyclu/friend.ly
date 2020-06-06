import React, { Component } from "react";

class NotAuthorizedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.setTimeout(() => {
      window.location.href = '/';
    }, 5000);
  }

  render() {
    return (
      <>
        <div className="notauthorized">
          <h3>Sorry friend, you're not authorized to do that</h3>
          <span>But don't worry, we'll redirect you back in a few seconds.</span>
        </div>
      </>
    );
  }
}

export default NotAuthorizedApp;
