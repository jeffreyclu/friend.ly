import React from 'react';

const Login = () => {
  console.log('sup');
  return (
    <div className="loginForm">
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="text" />
      </label>
    </div>
  );
};

export default Login;
