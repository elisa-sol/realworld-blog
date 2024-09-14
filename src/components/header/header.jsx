import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import classes from './header.module.scss';
import { UserContext } from '../../userContext/userContext';

function Header() {
  const { user, logoutUser } = useContext(UserContext);

  const defaultAvatar = 'https://static.productionready.io/images/smiley-cyrus.jpg';

  return (
    <div className={classes.header}>
      <Link className={classes['header-name']} to="/" style={{ textDecoration: 'none', color: 'black' }}>
        Realworld Blog
      </Link>
      <div className={classes['header-buttons']}>
        {user ? (
          <div className={classes.container}>
            <button className={classes['create-article']} type="button">
              Create article
            </button>
            <Link className={classes.username} to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
              {user.username}
            </Link>
            <Link className={classes.avatar} to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
              <img src={user.image || defaultAvatar} alt="User Avatar" className={classes.image} />
            </Link>
            <button className={classes.logout} type="button" onClick={logoutUser}>
              Log Out
            </button>
          </div>
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
