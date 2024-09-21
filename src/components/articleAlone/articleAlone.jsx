// компонент когда мы нажимаем на статью и видим кнопки эдита и удаления

import React, { useCallback, useEffect, useMemo } from 'react';

import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Alert, Popconfirm } from 'antd';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Markdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  deleteArticle,
  likedArticle,
  setIsLiked,
  setLikesCount,
  setSuccessMessage,
  updateLikedArticles,
  watchArticle,
} from '../../redux/slices/articlesSlice';
import classes from '../articleItem/articleItem.module.scss';
import Loader from '../loader/loader';

function ArticleAlone() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { article, currentUser, isLiked, likesCount, successMessage, likedArticles } = useSelector((state) => ({
    article: state.articles.article,
    currentUser: state.articles.article.author ? state.articles.article.author.username : null,
    isLiked: state.articles.isLiked[slug] || false,
    likesCount: state.articles.likesCount[slug] || state.articles.article.favoritesCount,
    successMessage: state.articles.successMessage,
    likedArticles: state.articles.likedArticles,
  }));
  const token = useSelector((state) => state.users.token);
  const localUser = useSelector((state) => state.users.user);

  useEffect(() => {
    if (slug) {
      dispatch(watchArticle(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (article && article.slug) {
      const liked = likedArticles.includes(article.slug);
      dispatch(setIsLiked({ slug: article.slug, isLiked: liked }));
    }
  }, [article.slug, likedArticles, dispatch]);

  const isOwner = useMemo(() => {
    return localUser && currentUser && article.author && article.author.username === localUser.username;
  }, [localUser, currentUser, article.author]);

  const confirm = useCallback(() => {
    dispatch(deleteArticle(slug));
    dispatch(setSuccessMessage('Статья успешно удалена'));
    setTimeout(() => {
      navigate('/');
      dispatch(setSuccessMessage(null));
    }, 1000);
  }, [dispatch, slug, navigate]);

  const cancel = () => {
    console.log('no');
  };

  const handleLike = useCallback(async () => {
    if (!token) {
      navigate('/sign-in');
      return;
    }

    try {
      await dispatch(likedArticle(slug));

      const newLikesCount = !isLiked ? likesCount + 1 : likesCount - 1;

      dispatch(setLikesCount({ [slug]: newLikesCount }));
      dispatch(setIsLiked({ slug, isLiked: !isLiked }));

      let updatedLikedArticles = likedArticles;
      if (isLiked) {
        updatedLikedArticles = likedArticles.filter((likedSlug) => likedSlug !== slug);
      } else {
        if (!likedArticles.includes(slug)) {
          updatedLikedArticles = [...likedArticles, slug];
        }
      }

      dispatch(updateLikedArticles(updatedLikedArticles));
    } catch (error) {
      console.log('Ошибка при изменении лайка');
    }
  }, [isLiked, dispatch, slug, token, likesCount, likedArticles, navigate]);

  if (!article || !article.author) return <Loader />;

  return (
    <div className={classes['alone-container']}>
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.title}>
            <Link className={classes.link} to={`/article/${article.slug}`}>
              {/* {article.title} */}
              {typeof article.title === 'string' ? article.title : JSON.stringify(article.title)}
            </Link>
          </div>
          <div className={classes['likes-container']}>
            {isLiked ? (
              <HeartFilled onClick={handleLike} className={classes.heart} style={{ fontSize: '18px', color: 'red' }} />
            ) : (
              <HeartOutlined onClick={handleLike} className={classes.heart} style={{ fontSize: '18px' }} />
            )}
            <div className={classes.likes} onClick={handleLike}>
              {likesCount}
            </div>
          </div>
        </div>

        <div className={classes.right}>
          <div className={classes.mini}>
            <div className={classes.username}>{article.author.username}</div>
            <div className={classes.date}>
              {article.createdAt
                ? format(new Date(article.createdAt), 'MMMM dd, yyyy', { locale: enUS })
                : 'Invalid date'}
            </div>
          </div>
          <img
            className={classes.image}
            src={article.author.image}
            alt="author"
            style={{ width: '46px', height: '46px' }}
          />
        </div>
      </div>
      <div className={classes.tags}>
        {article.tagList
          .filter((tag) => tag.trim() !== '')
          .map((tag, index) => (
            <div className={classes['tag-upgraded']} key={index}>
              {tag.trim()}
            </div>
          ))}
      </div>
      <div className={classes['description-upgraded']}>
        {/* {article.description} */}
        {typeof article.description === 'string' ? article.description : JSON.stringify(article.description)}
      </div>
      <Markdown className={classes.markdown} children={String(article.body)} />

      {isOwner && (
        <div className={classes['button-container']}>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <button type="button" className={classes.delete}>
              Delete
            </button>
          </Popconfirm>

          <Link className={classes.edit} to={`/articles/${article.slug}/edit`} style={{ textDecoration: 'none' }}>
            Edit
          </Link>
        </div>
      )}
      {successMessage && (
        <Alert
          message={successMessage}
          type="success"
          showIcon
          style={{ position: 'fixed', bottom: '20px', left: '40%', fontSize: 'large' }}
        />
      )}
    </div>
  );
}

export default ArticleAlone;
