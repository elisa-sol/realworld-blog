import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Alert, Popconfirm } from 'antd';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Markdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { watchArticle, deleteArticle, likedArticle } from '../../redux/actions';
import classes from '../articleItem/articleItem.module.scss';
import Loader from '../loader/loader';

function ArticleAlone() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { article } = useSelector((state) => state);
  const { slug } = useParams();
  const [localUser, setLocalUser] = useState(null);
  const token = localStorage.getItem('jwtToken');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.favoritesCount || 0);
  const currentUser = useSelector((state) => state.article.author.username);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setLocalUser(user);
  }, []);

  useEffect(() => {
    dispatch(watchArticle(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
    setIsLiked(likedArticles.includes(article.slug));
  }, [article.slug]);

  const isOwner = useMemo(() => {
    return localUser && currentUser && article.author.username === localUser.username;
  }, [localUser, currentUser, article.author.username]);

  const confirm = useCallback(() => {
    dispatch(deleteArticle(article.slug, token));
    setSuccessMessage('Статья успешно удалена');
    setTimeout(() => {
      navigate('/');
      setSuccessMessage(null);
    }, 1000);
  }, [dispatch, article.slug, token, navigate]);

  const cancel = useCallback(() => {
    console.log('no');
  }, []);

  const handleLike = useCallback(async () => {
    console.log('like');
    try {
      const action = isLiked ? 'unlike' : 'like';
      await dispatch(likedArticle(article.slug, token, action));

      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      setIsLiked(!isLiked);

      const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
      if (isLiked) {
        const updatedLikes = likedArticles.filter((slug) => slug !== article.slug);
        localStorage.setItem('likedArticles', JSON.stringify(updatedLikes));
      } else {
        likedArticles.push(article.slug);
        localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
      }
    } catch (error) {
      console.log('Ошибка при изменении лайка');
    }
  }, [isLiked, dispatch, article.slug, token, likesCount]);

  if (!article.slug) return <Loader />;

  return (
    <div className={classes['alone-container']}>
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.title}>
            <Link className={classes.link} to={`/article/${article.slug}`}>
              {article.title}
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
            <div className={classes.date}>{format(new Date(article.createdAt), 'MMMM dd, yyyy', { locale: enUS })}</div>
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
      <div className={classes['description-upgraded']}>{article.description}</div>
      <Markdown className={classes.markdown} children={article.body} />
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

export default memo(ArticleAlone);
