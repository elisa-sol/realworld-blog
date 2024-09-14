import React, { useContext, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import isURL from 'validator/es/lib/isURL';
// eslint-disable-next-line import/no-extraneous-dependencies
import isEmail from 'validator/lib/isEmail';

import classes from './editProfile.module.scss';
import { editProfile } from '../../redux/actions';
import { UserContext } from '../../userContext/userContext';
import Loader from '../loader/loader';

function EditProfile() {
  // const token = localStorage.getItem('token'); // Проверяем наличие токена
  // if (!token) {
  //   console.log('Токен отсутствует');
  // }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const { user, loginUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const updatedUser = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('signUpData', JSON.stringify(updatedUser));
      loginUser(updatedUser);
      await dispatch(editProfile(data));
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      setLoginError('Invalid email or password');
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
        {loginError && <span className={classes.errors}>{loginError}</span>} {/* Отображение ошибки входа */}
        {successMessage && <span className={classes.success}>{successMessage}</span>}
        <button type="submit" className={classes.btn}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
