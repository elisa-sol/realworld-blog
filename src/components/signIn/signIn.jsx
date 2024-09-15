import React, { useContext, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import isEmail from 'validator/lib/isEmail';

import classes from './signIn.module.scss';
import { signIn } from '../../redux/actions';
import { UserContext } from '../../userContext/userContext';

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data) => {
    try {
      const { token, username } = await dispatch(signIn(data));
      if (token) {
        localStorage.setItem('jwtToken', token);
        const mail = `${data.email}-image`;
        const img = localStorage.getItem(mail);
        loginUser({ ...data, username, token, image: img });
        navigate('/');
      } else {
        console.log(1);
      }
    } catch (error) {
      setLoginError('Invalid email or password');
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
        {loginError && <span className={classes.errors}>{loginError}</span>}
        <button className={classes.btn} type="submit">
          Login
        </button>
        <div className={classes.question}>
          Don’t have an account?
          <Link to="/sign-up" style={{ textDecoration: 'none', color: '#1890FF' }}>
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
