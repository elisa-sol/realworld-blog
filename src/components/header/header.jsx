import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import classes from './header.module.scss';
import { logoutUser } from '../../redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);

  const defaultAvatar = 'https://static.productionready.io/images/smiley-cyrus.jpg';

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className={classes.header}>
      <Link className={classes['header-name']} to="/" style={{ textDecoration: 'none', color: 'black' }}>
        Realworld Blog
      </Link>
      <div className={classes['header-buttons']}>
        {user ? (
          <div className={classes.container}>
            <Link className={classes['create-article']} to="/new-article" style={{ textDecoration: 'none' }}>
              Create article
            </Link>
            <Link className={classes.username} to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
              {user.username}
            </Link>
            <Link className={classes.avatar} to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
              <img src={user.image || defaultAvatar} alt="User Avatar" className={classes.image} />
            </Link>
            <button className={classes.logout} type="button" onClick={handleLogout}>
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
