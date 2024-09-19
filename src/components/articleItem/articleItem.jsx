import React, { useEffect, useState } from 'react';

import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import classes from './articleItem.module.scss';
import { likedArticle } from '../../redux/actions';

function ArticleItem({ article }) {
  const token = localStorage.getItem('jwtToken');
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.favoritesCount);

  useEffect(() => {
    const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
    setIsLiked(likedArticles.includes(article.slug));
  }, [article.slug]);

  const handleLike = async () => {
    if (!token || !user) {
      navigate('/sign-in');
    }

    try {
      const action = isLiked ? 'unlike' : 'like';
      await dispatch(likedArticle(article.slug, token, action));

      const newLikesCount = isLiked ? likesCount - 1 : likesCount + 1;
      setLikesCount(newLikesCount);
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
  };

  const truncate = (str, max = 5) => {
    if (!str) return '';
    const array = str.trim().split(' ');
    const ellipsis = array.length > max ? '...' : '';
    return array.slice(0, max).join(' ') + ellipsis;
  };

  return (
    <div className={classes['article-item']}>
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.title}>
            <Link className={classes.link} to={`/article/${article.slug}`}>
              {truncate(article.title)}
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
        {(article.tagList || [])
          .filter((tag) => tag.trim() !== '')
          .map((tag, index) => (
            <div className={classes.tag} key={index}>
              {truncate(tag.trim())}
            </div>
          ))}
      </div>
      <div className={classes.description}>{truncate(article.description)}</div>
    </div>
  );
}

export default ArticleItem;
