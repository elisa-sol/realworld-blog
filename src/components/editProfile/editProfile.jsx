import React from 'react';

import classes from './editProfile.module.scss';
import isEmail from 'validator/lib/isEmail.js';

function EditProfile() {
  return (
    <div className={classes['edit-profile']}>
      <div className={classes.header}> Edit Profile </div>
      <form className={classes.container}>
        <div className={classes.name}>
          Username
          <input className={classes.username} id="username" type="text" placeholder="" />
        </div>

        <div className={classes.name}>
          Email address
          <input className={classes.email} id="email" type="text" placeholder="" />
        </div>

        <div className={classes.name}>
          New password
          <input className={classes.password} id="password" type="password" placeholder="New password" />
        </div>

        <div className={classes.name}>
          Avatar image (url)
          <input className={classes.password} id="password" type="password" placeholder="Avatar image" />
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
