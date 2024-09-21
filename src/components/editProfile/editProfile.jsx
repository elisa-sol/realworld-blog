import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import isURL from 'validator/es/lib/isURL';
// eslint-disable-next-line import/no-extraneous-dependencies
import isEmail from 'validator/lib/isEmail';

import classes from './editProfile.module.scss';
import { editProfile, loginUser, setLoginError, setSuccessMessage } from '../../redux/slices/usersSlice';
import Loader from '../loader/loader';

function EditProfile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const { user, token, loginError, successMessage } = useSelector((state) => ({
    token: state.users.token,
    user: state.users.user,
    successMessage: state.users.successMessage,
    loginError: state.users.loginError,
  }));

  const onSubmit = async (data) => {
    try {
      if (!token) {
        dispatch(setLoginError('Token not found. Please log in again.'));
        return;
      }

      const result = await dispatch(editProfile(data, token)).unwrap();
      if (result) {
        const updatedUser = { ...user, ...data, image: data.image || user.image };
        dispatch(loginUser(updatedUser));

        dispatch(setSuccessMessage('Profile updated successfully'));
        dispatch(setLoginError(''));
      } else {
        dispatch(setLoginError('Error updating profile. Invalid token.'));
      }
    } catch (error) {
      if (error.message === 'jwt malformed') {
        dispatch(setLoginError('Invalid token. Please log in again.'));
      } else {
        dispatch(setLoginError('Error updating profile'));
      }
      dispatch(setSuccessMessage(''));
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <div className={classes['edit-profile']}>
      <div className={classes.header}> Edit Profile </div>
      <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.name}>
          Username
          <input
            className={`${classes.username} ${errors.username ? classes.inputError : ''}`}
            id="username"
            type="text"
            defaultValue={user.username}
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
            defaultValue={user.email}
            {...register('email', {
              required: 'Email address is required',
              validate: (input) => isEmail(input) || 'Invalid email address',
            })}
          />
          {errors.email && <span className={classes.errors}>{errors.email.message}</span>}
        </div>
        <div className={classes.name}>
          New password
          <input
            className={`${classes.password} ${errors.password ? classes.inputError : ''}`}
            id="password"
            type="password"
            placeholder="New password"
            defaultValue={user.password}
            {...register('password', {
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
          Avatar image (url)
          <input
            className={`${classes.avatar} ${errors.image ? classes.inputError : ''}`}
            id="image"
            type="url"
            placeholder="Avatar image"
            defaultValue={user.image}
            {...register('image', {
              required: false,
              validate: () => isURL(watch('image')) || 'Invalid url format',
            })}
          />
          {errors.image && <span className={classes.errors}>{errors.image.message}</span>}
        </div>
        {loginError && <span className={classes.errors}>{loginError}</span>}
        {successMessage && <span className={classes.success}>{successMessage}</span>}
        <button type="submit" className={classes.btn}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
