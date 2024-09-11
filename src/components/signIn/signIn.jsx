import React from 'react';

import classes from './signIn.module.scss';
import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div className={classes['sign-in']}>
      <div className={classes.header}>Sign In</div>
      <div className={classes.container}>
        <div className={classes.name}>
          {' '}
          Email address
          <input className={classes.input} placeholder="Email address"></input>
        </div>
        <div className={classes.name}>
          {' '}
          Password
          <input className={classes.input} placeholder="Password"></input>
        </div>
        <div className={classes.btn}>Login</div>
        <div className={classes.question}>
          Don’t have an account?
          <Link to={`/sign-up`} style={{ textDecoration: 'none', color: '#1890FF' }}>
            {' '}
            Sign Up.{' '}
          </Link>{' '}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
