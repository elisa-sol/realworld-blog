// import React from 'react';
//
// import classes from './signUp.module.scss';
// import { Link } from 'react-router-dom';
//
// function SignUp() {
//   return (
//     <div className={classes['sign-up']}>
//       <div className={classes.header}> Create new account </div>
//       <div className={classes.container}>
//         <div className={classes.name}>
//           {' '}
//           Username
//           <input className={classes.username} id="username" type="text" name="username" placeholder="Username" />
//         </div>
//         <div className={classes.name}>
//           {' '}
//           Email address
//           <input className={classes.email} id="email" type="text" name="email" placeholder="Email address" />
//         </div>
//         <div className={classes.name}>
//           {' '}
//           Password
//           <input className={classes.password} id="password" type="text" name="password" placeholder="Password" />
//         </div>
//         <div className={classes.name}>
//           {' '}
//           Repeat Password
//           <input className={classes.repeat} id="repeat" type="text" name="repeat" placeholder="Password" />
//         </div>
//         <div className={classes.agreement}>
//           <label htmlFor="checkbox" className={classes.label}>
//             <input className={classes.checkbox} id="checkbox" name="checkbox" type="checkbox" />I agree to the
//             processing of my personal information
//           </label>
//         </div>
//         <div className={classes.btn}> Create </div>
//         <div className={classes.question}>
//           {' '}
//           Already have an account?{' '}
//           <Link className={classes.in} to={`/sign-in`} style={{ textDecoration: 'none', color: '#1890FF' }}>
//             Sign In.{' '}
//           </Link>{' '}
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default SignUp;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './signUp.module.scss';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    agreement: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.repeatPassword) newErrors.repeatPassword = 'Passwords do not match';
    if (!formData.agreement) newErrors.agreement = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Отправка данных на сервер
    // Здесь можно выполнить запрос на сервер с formData
    console.log('Form data submitted:', formData);
  };

  return (
    <form className={classes['sign-up']} onSubmit={handleSubmit}>
      <div className={classes.header}>Create new account</div>
      <div className={classes.container}>
        <div className={classes.name}>
          Username
          <input
            className={classes.username}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div className={classes.error}>{errors.username}</div>}
        </div>
        <div className={classes.name}>
          Email address
          <input
            className={classes.email}
            type="text"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className={classes.error}>{errors.email}</div>}
        </div>
        <div className={classes.name}>
          Password
          <input
            className={classes.password}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className={classes.error}>{errors.password}</div>}
        </div>
        <div className={classes.name}>
          Repeat Password
          <input
            className={classes.repeat}
            type="password"
            name="repeatPassword"
            placeholder="Repeat Password"
            value={formData.repeatPassword}
            onChange={handleChange}
          />
          {errors.repeatPassword && <div className={classes.error}>{errors.repeatPassword}</div>}
        </div>
        <div className={classes.agreement}>
          <label htmlFor="agreement" className={classes.label}>
            <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleChange} />I agree to
            the processing of my personal information
          </label>
          {errors.agreement && <div className={classes.error}>{errors.agreement}</div>}
        </div>
        <button type="submit" className={classes.btn}>
          Create
        </button>
        <div className={classes.question}>
          Already have an account?{' '}
          <Link className={classes.in} to="/sign-in">
            Sign In.
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
