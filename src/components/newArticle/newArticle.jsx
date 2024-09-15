import React, { useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import classes from './newArticle.module.scss';
import { addArticle } from '../../redux/actions';

function NewArticle() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      const tagsArray = data.tags ? data.tags.split(',').map((tag) => tag.trim()) : [];

      const articleData = {
        ...data,
        tagList: tagsArray,
      };

      const token = localStorage.getItem('jwtToken');
      await dispatch(addArticle(articleData, token));
    } catch (error) {
      console.log('Ошибка добавления статьи');
    }
  };

  return (
    <div className={classes['new-article']}>
      <div className={classes.header}> Create new article</div>
      <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.name}>
          Title
          <input
            className={`${classes.title} ${errors.title ? classes.inputError : ''}`}
            type="text"
            placeholder="Title"
            {...register('title', {
              required: 'Title is required',
            })}
          />
          {errors.title && <span className={classes.errors}>{errors.title.message}</span>}
        </div>
        <div className={classes.name}>
          Short description
          <input
            className={`${classes.description} ${errors.description ? classes.inputError : ''}`}
            type="text"
            placeholder="Description"
            {...register('description', {
              required: 'Short description is required',
            })}
          />
          {errors.description && <span className={classes.errors}>{errors.description.message}</span>}
        </div>
        <div className={classes.name}>
          Text
          <input
            className={`${classes.text} ${errors.body ? classes.inputError : ''}`}
            type="text"
            placeholder="Text"
            {...register('body', {
              required: 'Text is required',
            })}
          />
          {errors.body && <span className={classes.errors}>{errors.body.message}</span>}
        </div>
        <div className={classes['mini-container']}>
          <div className={classes.tags}>
            Tags
            <input className={classes.tag} placeholder="Tag" type="text" {...register('tags')} />
          </div>
          {/* <div className={classes['button-container']}> */}
          <button type="submit" className={classes.delete}>
            Delete
          </button>
          <button type="submit" className={classes['add-tag']}>
            Add tag
          </button>
          {/* </div> */}
        </div>
        <button type="submit" className={classes.send}>
          Send
        </button>
      </form>
    </div>
  );
}

export default NewArticle;
