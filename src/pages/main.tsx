import React from 'react';
import {Link, Route} from 'react-router-dom';

function Main(): JSX.Element {
  return (
    <>
      <div>hi</div>
      <button id="login-btn" type="button">
        <Link to="/login">Login</Link>
      </button>
    </>
  );
}

export default Main;
