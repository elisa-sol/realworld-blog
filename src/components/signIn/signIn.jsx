import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import classes from './signIn.module.scss';
import { useSignInMutation } from '../../redux/rtk/usersApi';
import { setLoginError, loginUser } from '../../redux/slices/usersSlice';

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signIn, { isLoading, error }] = useSignInMutation();

  const onSubmit = async (data) => {
    try {
      const { token, username, email, image } = await signIn(data).unwrap();

      if (token) {
        dispatch(loginUser({ username, email, image, token }));
      }

      navigate('/');
      return { username, email, image, token };
    } catch (err) {
      dispatch(setLoginError('Invalid email or password'));
      return { error: err };
    }
  };

  return (
    <div className={classes['sign-in']}>
      <div className={classes.header}>Sign In</div>

      <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.name}>
          Email address
          <input
            className={`${classes.input} ${errors.email ? classes.inputError : ''}`}
            type="text"
            placeholder="Email address"
            {...register('email', {
              required: 'Email address is required',
              validate: (input) => isEmail(input) || 'Invalid email address',
            })}
          />
          {errors.email && <span className={classes.errors}>{errors.email.message}</span>}
        </div>
        <div className={classes.name}>
          Password
          <input
            className={`${classes.input} ${errors.password ? classes.inputError : ''}`}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Password must be less than 40 characters',
              },
            })}
          />
          {errors.password && <span className={classes.errors}>{errors.password.message}</span>}
        </div>
        {error && <span className={classes.errors}>Invalid email or password</span>}
        <button className={classes.btn} type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <div className={classes.question}>
          Don’t have an account?
          <Link to="/sign-up" style={{ textDecoration: 'none', color: '#1890FF' }}>
            {' '}
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
