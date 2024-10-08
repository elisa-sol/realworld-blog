import React from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './newArticle.module.scss';
import { useAddArticleMutation } from '../../redux/rtk/articlesApi';
import { setTagList } from '../../redux/slices/articlesSlice';
import Loader from '../loader/loader';

function NewArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tagList = useSelector((state) => state.articles.tagList || []);
  const token = useSelector((state) => state.users.token);
  const [addArticle, { isLoading, error }] = useAddArticleMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      const articleData = {
        title: data.title || '',
        description: data.description || '',
        body: data.body || '',
        tagList: tagList.filter((tag) => tag.trim() !== ''),
      };

      await addArticle(articleData);

      if (!token) {
        navigate('/sign-in');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.log('Ошибка добавления статьи');
    }
  };

  const handleTagChange = (value, index) => {
    const updatedTagList = [...tagList];
    updatedTagList[index] = value;
    dispatch(setTagList(updatedTagList));
  };

  const handleClickAddTag = () => {
    if (tagList.length === 0 || tagList[tagList.length - 1].trim() !== '') {
      dispatch(setTagList([...tagList, '']));
    }
  };

  const handleClickDeleteTag = (index) => {
    if (tagList[index].trim() !== '' && index !== 0) {
      dispatch(setTagList(tagList.filter((_, i) => i !== index)));
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Ошибка создания статьи</p>;

  return (
    <div className={classes['new-article']}>
      <div className={classes.header}>Create new article</div>
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
    </div>
  );
}

export default NewArticle;

NewArticle.propTypes = {
  // eslint-disable-next-line react/require-default-props
  article: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    favorited: PropTypes.bool,
    favoritesCount: PropTypes.number,
    author: PropTypes.shape({
      username: PropTypes.string,
      image: PropTypes.string,
    }),
  }),
};
