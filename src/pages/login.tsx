import React from 'react';
import EmailLogin from '../components/Login/EmailLogin/EmailLogin';
import GoogleLogin from '../components/Login/GoogleLogin/GoogleLogin';

function Login(): JSX.Element {
  return (
    <>
      <div>Here is Login Pages</div>
      <br />
      <EmailLogin />
      <GoogleLogin />
    </>
  );
}

export default Login;
