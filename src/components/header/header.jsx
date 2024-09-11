import React from 'react';

import classes from './header.module.scss';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className={classes.header}>
      <Link className={classes['header-name']} to={`/`} style={{ textDecoration: 'none', color: 'black' }}>
        Realworld Blog
      </Link>
      <div className={classes['header-buttons']}>
        <Link className={classes['sign-in']} to={`/sign-in`} style={{ textDecoration: 'none' }}>
          Sign In
        </Link>
        <Link className={classes['sign-up']} to={`/sign-up`} style={{ textDecoration: 'none' }}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Header;
