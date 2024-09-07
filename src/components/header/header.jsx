import React from 'react';

import classes from './header.module.scss';

function Header() {
  return (
    <div className={classes.header}>
      <div className={classes['header-name']}>
      Realworld Blog
      </div>
      <div className={classes['header-buttons']}>
        <span className={classes['sign-in']}>
          Sign In
        </span>
        <span className={classes['sign-up']}>
           Sign Up
        </span>
      </div>
    </div>
  )
}

export default Header;