import React from 'react';

import classes from './signUp.module.scss';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className={classes['sign-up']}>
      <div className={classes.header}> Create new account </div>
      <div className={classes.container}>
        <div className={classes.name}>
          {' '}
          Username
          <input className={classes.username} id="username" type="text" name="username" placeholder="Username" />
        </div>
        <div className={classes.name}>
          {' '}
          Email address
          <input className={classes.email} id="email" type="text" name="email" placeholder="Email address" />
        </div>
        <div className={classes.name}>
          {' '}
          Password
          <input className={classes.password} id="password" type="text" name="password" placeholder="Password" />
        </div>
        <div className={classes.name}>
          {' '}
          Repeat Password
          <input className={classes.repeat} id="repeat" type="text" name="repeat" placeholder="Password" />
        </div>
        <div className={classes.agreement}>
          <label htmlFor="checkbox" className={classes.label}>
            <input className={classes.checkbox} id="checkbox" name="checkbox" type="checkbox" />I agree to the
            processing of my personal information
          </label>
        </div>
        <div className={classes.btn}> Create </div>
        <div className={classes.question}>
          {' '}
          Already have an account?{' '}
          <Link className={classes.in} to={`/sign-in`} style={{ textDecoration: 'none', color: '#1890FF' }}>
            Sign In.{' '}
          </Link>{' '}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
