import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { editArticle } from '../../redux/actions';
import classes from '../newArticle/newArticle.module.scss';

function EditArticle() {
  const dispatch = useDispatch();
  const { slug } = useParams();

  return (
    <div className={classes['new-article']}>
      <div className={classes.header}> Edit article </div>
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
          <button type="button" className={classes.delete}>
            Delete
          </button>
          <button type="button" className={classes['add-tag']}>
            Add tag
          </button>
        </div>
        <button type="button" className={classes.send}>
          Send
        </button>
      </div>
    </div>
  );
}

export default EditArticle;
