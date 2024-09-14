import React from 'react';

import classes from './newArticle.module.scss';

function NewArticle() {
  return (
    <div className={classes['new-article']}>
      <div className={classes.header}> Create new article</div>
      <div className={classes.container}>
        <div className={classes.name}>
          Title
          <input className={classes.title} placeholder="Title" />
        </div>
        <div className={classes.name}>
          Short description
          <input className={classes.description} placeholder="Description" />
        </div>
        <div className={classes.name}>
          Text
          <input className={classes.text} placeholder="Text" />
        </div>
        <div className={classes['mini-container']}>
          <div className={classes.tags}>
            Tags
            <input className={classes.tag} placeholder="Tag" />
          </div>
          {/* <div className={classes['button-container']}> */}
          <button type="button" className={classes.delete}>
            Delete
          </button>
          <button type="button" className={classes['add-tag']}>
            Add tag
          </button>
          {/* </div> */}
        </div>
        <button type="button" className={classes.send}>
          Send
        </button>
      </div>
    </div>
  );
}

export default NewArticle;
