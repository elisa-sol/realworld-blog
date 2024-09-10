import React from 'react';

import classes from './header.module.scss';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className={classes.header}>
      <div className={classes['header-name']}>Realworld Blog</div>
      <div className={classes['header-buttons']}>
        <span className={classes['sign-in']}>Sign In</span>
        <Link className={classes['sign-up']} to={`/sign-up`} style={{ textDecoration: 'none' }}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Header;
