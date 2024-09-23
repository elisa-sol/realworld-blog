// import React from 'react';
//
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import isEmail from 'validator/lib/isEmail';
//
// import classes from './signUp.module.scss';
// import { signUp, setLoginError, loginUser } from '../../redux/slices/usersSlice';
//
// function SignUp() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     mode: 'onChange',
//   });
//
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const loginError = useSelector((state) => state.users.loginError);
//
//   const onSubmit = async (data) => {
//     try {
//       const { token, username, email, image } = await dispatch(signUp(data)).unwrap();
//
//       if (token) {
//         dispatch(loginUser({ username, email, image, token }));
//         navigate('/');
//       }
//     } catch (error) {
//       console.log('Ошибка регистрации:', error.message);
//       dispatch(setLoginError('Registration failed'));
//
//       /* if (error.email) {
//         dispatch(setLoginError('Email is already taken.'));
//       } else if (error.username) {
//         dispatch(setLoginError('Username is already taken.'));
//       } else {
//         dispatch(setLoginError('Username or email is already taken.'));
//       } */
//     }
//   };
//
//   const passwordValue = watch('password', '');
//
//   return (
//     <div className={classes['sign-up']}>
//       <div className={classes.header}> Create new account </div>
//
//       <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
//         <div className={classes.name}>
//           Username
//           <input
//             className={`${classes.username} ${errors.username ? classes.inputError : ''}`}
//             id="username"
//             type="text"
//             placeholder="Username"
//             {...register('username', {
//               required: 'Username is required',
//               minLength: {
//                 value: 3,
//                 message: 'Username must be at least 3 characters',
//               },
//               maxLength: {
//                 value: 20,
//                 message: 'Username must be less than 20 characters',
//               },
//             })}
//           />
//           {errors.username && <span className={classes.errors}>{errors.username.message}</span>}
//         </div>
//
//         <div className={classes.name}>
//           Email address
//           <input
//             className={`${classes.email} ${errors.email ? classes.inputError : ''}`}
//             id="email"
//             type="text"
//             placeholder="Email address"
//             {...register('email', {
//               required: 'Email address is required',
//               validate: (input) => isEmail(input) || 'Invalid email address',
//             })}
//           />
//           {errors.email && <span className={classes.errors}>{errors.email.message}</span>}
//         </div>
//
//         <div className={classes.name}>
//           Password
//           <input
//             className={`${classes.password} ${errors.password ? classes.inputError : ''}`}
//             id="password"
//             type="password"
//             placeholder="Password"
//             {...register('password', {
//               required: 'Password is required',
//               minLength: {
//                 value: 6,
//                 message: 'Password must be at least 6 characters',
//               },
//               maxLength: {
//                 value: 40,
//                 message: 'Password must be less than 40 characters',
//               },
//             })}
//           />
//           {errors.password && <span className={classes.errors}>{errors.password.message}</span>}
//         </div>
//
//         <div className={classes.name}>
//           Repeat Password
//           <input
//             className={`${classes.repeat} ${errors.repeatPassword ? classes.inputError : ''}`}
//             id="repeatPassword"
//             type="password"
//             placeholder="Password"
//             {...register('repeatPassword', {
//               required: 'Password is required',
//               validate: (value) => value === passwordValue || 'Passwords do not match',
//             })}
//           />
//           {errors.repeatPassword && <span className={classes.errors}>{errors.repeatPassword.message}</span>}
//         </div>
//
//         <div className={classes.agreement}>
//           <label htmlFor="checkbox" className={classes.label}>
//             <input
//               className={classes.checkbox}
//               id="checkbox"
//               type="checkbox"
//               {...register('agreement', {
//                 required: 'Please accept the terms and conditions to continue',
//               })}
//             />
//             I agree to the processing of my personal information
//           </label>
//           {errors.agreement && <span className={classes.errors}>{errors.agreement.message}</span>}
//         </div>
//         {loginError && <span className={classes.errors}>{loginError}</span>}
//         <button className={classes.btn} type="submit">
//           Create
//         </button>
//         <div className={classes.question}>
//           Already have an account?{' '}
//           <Link className={classes.in} to="/sign-in" style={{ textDecoration: 'none', color: '#1890FF' }}>
//             Sign In.{' '}
//           </Link>{' '}
//         </div>
//       </form>
//     </div>
//   );
// }
//
// export default SignUp;

import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import classes from './signUp.module.scss';
import { useSignUpMutation } from '../../redux/rtk/usersApi';
import { setLoginError, loginUser } from '../../redux/slices/usersSlice';

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUp, { isLoading, error }] = useSignUpMutation();

  const onSubmit = async (data) => {
    try {
      const { token, username, email, image } = await signUp(data).unwrap();

      if (token) {
        dispatch(loginUser({ username, email, image, token }));
      }

      navigate('/');
    } catch (err) {
      console.log('Ошибка регистрации:', error.message);
      dispatch(setLoginError('Registration failed'));
    }
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
        {error && <span className={classes.errors}>Email or username is already taken</span>}
        <button className={classes.btn} type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </button>
        <div className={classes.question}>
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
