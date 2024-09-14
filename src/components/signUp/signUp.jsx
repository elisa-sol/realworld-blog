import React, { useContext } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import isEmail from 'validator/lib/isEmail';

import classes from './signUp.module.scss';
import { signUp } from '../../redux/actions';
import { UserContext } from '../../userContext/userContext';

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(signUp(data))
      .then(() => {
        localStorage.setItem('signUpData', JSON.stringify(data));
        loginUser(data);
        navigate('/');
      })
      .catch((error) => {
        console.log('Ошибка регистрации:', error);
      });
  };

  const passwordValue = watch('password', '');

  return (
    <div className={classes['sign-up']}>
      <div className={classes.header}> Create new account </div>

      <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.name}>
          Username
          <input
            className={`${classes.username} ${errors.username ? classes.inputError : ''}`}
            id="username"
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must be less than 20 characters',
              },
            })}
          />
          {errors.username && <span className={classes.errors}>{errors.username.message}</span>}
        </div>

        <div className={classes.name}>
          Email address
          <input
            className={`${classes.email} ${errors.email ? classes.inputError : ''}`}
            id="email"
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
            className={`${classes.password} ${errors.password ? classes.inputError : ''}`}
            id="password"
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

        <div className={classes.name}>
          Repeat Password
          <input
            className={`${classes.repeat} ${errors.repeatPassword ? classes.inputError : ''}`}
            id="repeatPassword"
            type="password"
            placeholder="Password"
            {...register('repeatPassword', {
              required: 'Password is required',
              validate: (value) => value === passwordValue || 'Passwords do not match',
            })}
          />
          {errors.repeatPassword && <span className={classes.errors}>{errors.repeatPassword.message}</span>}
        </div>

        <div className={classes.agreement}>
          <label htmlFor="checkbox" className={classes.label}>
            <input
              className={classes.checkbox}
              id="checkbox"
              type="checkbox"
              {...register('agreement', {
                required: 'Please accept the terms and conditions to continue',
              })}
            />
            I agree to the processing of my personal information
          </label>
          {errors.agreement && <span className={classes.errors}>{errors.agreement.message}</span>}
        </div>

        <button className={classes.btn} type="submit">
          Create
        </button>
        <div className={classes.question}>
          {' '}
          Already have an account?{' '}
          <Link className={classes.in} to="/sign-in" style={{ textDecoration: 'none', color: '#1890FF' }}>
            Sign In.{' '}
          </Link>{' '}
        </div>
      </form>
    </div>
  );
}

export default SignUp;
