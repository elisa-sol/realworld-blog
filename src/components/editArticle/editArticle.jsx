import React, { useEffect, useState } from 'react';

import { Alert } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { watchArticle, editArticle, setTagList, setSuccessMessage } from '../../redux/slices/articlesSlice';
import classes from '../newArticle/newArticle.module.scss';

function EditArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { article, successMessage, tagList } = useSelector((state) => ({
    article: state.articles.article,
    successMessage: state.articles.successMessage,
    tagList: state.articles.tagList,
  }));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    dispatch(watchArticle(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (article) {
      setValue('title', article.title);
      setValue('description', article.description);
      setValue('body', article.body);
      dispatch(setTagList(article.tagList || []));
    }
  }, [article, setValue]);

  let timeoutId;

  const onSubmit = async (data) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/sign-in');
      return;
    }

    try {
      const articleData = {
        ...data,
        tagList: tagList.filter((tag) => tag.trim() !== ''),
      };

      await dispatch(editArticle({ articleData, slug, token })).unwrap();

      dispatch(setSuccessMessage('Статья успешно отредактирована'));
      setTimeout(() => {
        navigate('/');
        dispatch(setSuccessMessage(null));
      }, 1000);
    } catch (error) {
      console.log('Ошибка редактирования статьи');
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handleTagChange = (value, index) => {
    const updatedTagList = [...tagList];
    updatedTagList[index] = value;
    dispatch(setTagList(updatedTagList));
  };

  const handleClickAddTag = () => {
    if (!tagList || tagList.length === 0 || tagList[tagList.length - 1].trim() !== '') {
      dispatch(setTagList([...(tagList || []), '']));
    }
  };

  const handleClickDeleteTag = (index) => {
    if (tagList[index].trim() !== '' && index !== 0) {
      dispatch(setTagList(tagList.filter((_, i) => i !== index)));
    }
  };

  return (
    <div className={classes['new-article']}>
      <div className={classes.header}>Edit article</div>
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
        <div className={classes.tags}>Tags</div>

        {Array.isArray(tagList) && tagList.length === 0 ? (
          <div className={classes['mini-container']}>
            <input
              className={classes.tag}
              placeholder="Tag"
              type="text"
              value=""
              onChange={(e) => handleTagChange(e.target.value, 0)}
            />
            <button type="button" className={classes.delete} onClick={() => handleClickDeleteTag(0)}>
              Delete
            </button>
          </div>
        ) : (
          Array.isArray(tagList) &&
          tagList.map((tag, index) => (
            <div key={index} className={classes['mini-container']}>
              <input
                className={classes.tag}
                placeholder="Tag"
                type="text"
                value={tag}
                onChange={(e) => handleTagChange(e.target.value, index)}
              />
              <button type="button" className={classes.delete} onClick={() => handleClickDeleteTag(index)}>
                Delete
              </button>
            </div>
          ))
        )}

        <button type="button" className={classes['add-tag']} onClick={handleClickAddTag}>
          Add tag
        </button>

        <button type="submit" className={classes.send}>
          Send
        </button>
      </form>
      {successMessage && (
        <Alert
          message={successMessage}
          type="success"
          showIcon
          style={{ position: 'fixed', bottom: '20px', left: '35%', fontSize: 'large' }}
        />
      )}
    </div>
  );
}

export default EditArticle;
