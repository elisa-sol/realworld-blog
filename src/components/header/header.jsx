import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import classes from './header.module.scss';
import { UserContext } from '../../userContext/userContext';

function Header() {
  const { user, logoutUser } = useContext(UserContext);

  return (
    <div className={classes.header}>
      <Link className={classes['header-name']} to="/" style={{ textDecoration: 'none', color: 'black' }}>
        Realworld Blog
      </Link>
      <div className={classes['header-buttons']}>
        {user ? (
          <>
            <button className={classes['create-article']} type="button">
              Create article
            </button>
            <span className={classes.username}>
              {user.username} {user.image}
            </span>
            <button className={classes.logout} type="button" onClick={logoutUser}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link className={classes['sign-in']} to="/sign-in" style={{ textDecoration: 'none', color: '#1890FF' }}>
              Sign In
            </Link>
            <Link className={classes['sign-up']} to="/sign-up" style={{ textDecoration: 'none' }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
