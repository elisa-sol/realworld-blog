// import React, { useContext, useState } from 'react';
//
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import isEmail from 'validator/lib/isEmail';
// import { UserContext } from '../../userContext/userContext';
// import classes from './signIn.module.scss';
//
// function SignIn() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     mode: 'onChange',
//   });
//
//   const { loginUser } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [loginError, setLoginError] = useState('');
//
//   const onSubmit = (data) => {
//     const savedData = JSON.parse(localStorage.getItem('signUpData'));
//
//     if (savedData && savedData.email === data.email && savedData.password === data.password) {
//       loginUser(savedData);
//       navigate('/');
//     } else {
//       setLoginError('Invalid email or password');
//     }
//   };
//
//   return (
//     <div className={classes['sign-in']}>
//       <div className={classes.header}>Sign In</div>
//
//       <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
//         <div className={classes.name}>
//           Email address
//           <input
//             className={classes.input}
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
//             className={classes.input}
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
//         <button className={classes.btn} type="submit">
//           Login
//         </button>
//         <div className={classes.question}>
//           Don’t have an account?
//           <Link to="/sign-up" style={{ textDecoration: 'none', color: '#1890FF' }}>
//             {' '}
//             Sign Up.{' '}
//           </Link>{' '}
//         </div>
//       </form>
//     </div>
//   );
// }
//
// export default SignIn;

// src/components/SignIn.js
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import { UserContext } from '../../userContext/userContext';
import classes from './signIn.module.scss';

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const { loginUser } = useContext(UserContext); // Получаем функцию loginUser из контекста
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(''); // Состояние для ошибок входа

  const onSubmit = (data) => {
    // Извлекаем данные пользователя из localStorage
    const savedData = JSON.parse(localStorage.getItem('signUpData'));

    // Проверяем, совпадают ли введенные данные с сохраненными
    if (savedData && savedData.email === data.email && savedData.password === data.password) {
      loginUser(savedData); // Сохраняем пользователя в контекст
      navigate('/'); // Перенаправляем на главную страницу
    } else {
      setLoginError('Invalid email or password'); // Устанавливаем сообщение об ошибке
    }
  };

  return (
    <div className={classes['sign-in']}>
      <div className={classes.header}>Sign In</div>

      <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.name}>
          Email address
          <input
            className={classes.input}
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
            className={classes.input}
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
        {loginError && <span className={classes.errors}>{loginError}</span>} {/* Отображение ошибки входа */}
        <button className={classes.btn} type="submit">
          Login
        </button>
        <div className={classes.question}>
          Don’t have an account?
          <Link to="/sign-up" style={{ textDecoration: 'none', color: '#1890FF' }}>
            {' '}
            Sign Up.{' '}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
