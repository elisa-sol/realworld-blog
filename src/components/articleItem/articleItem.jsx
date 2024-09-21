// компонент когда мы видим все статьи списком на странице,
// но это не сам список, а как статья отображается у нас
// (например, чтобы текста было не очень много, чтобы все
// статьи поместились на странице)

import React, { useEffect } from 'react';

import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import classes from './articleItem.module.scss';
import { likedArticle, setIsLiked, setLikesCount, updateLikedArticles } from '../../redux/slices/articlesSlice';

function ArticleItem({ article }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const user = useSelector((state) => state.users.user);
  const likedArticles = useSelector((state) => state.articles.likedArticles);
  const { isLiked, likesCount } = useSelector((state) => ({
    isLiked: state.articles.isLiked[article.slug] || false,
    likesCount: state.articles.likesCount[article.slug] || article.favoritesCount,
  }));

  useEffect(() => {
    dispatch(setIsLiked({ slug: article.slug, isLiked: likedArticles.includes(article.slug) }));
  }, [article.slug, likedArticles, dispatch]);

  const handleLike = async () => {
    if (!token || !user) {
      navigate('/sign-in');
      return;
    }

    try {
      await dispatch(likedArticle(article.slug));

      const newLikesCount = isLiked ? likesCount - 1 : likesCount + 1;
      dispatch(setLikesCount({ slug: article.slug, count: newLikesCount }));
      dispatch(setIsLiked({ slug: article.slug, isLiked: !isLiked }));

      let updatedLikedArticles;
      if (isLiked) {
        updatedLikedArticles = likedArticles.filter((slug) => slug !== article.slug);
      } else {
        updatedLikedArticles = [...likedArticles, article.slug];
      }
      dispatch(updateLikedArticles(updatedLikedArticles));
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
            <div className={classes.likes}>{likesCount}</div>
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

ArticleItem.propTypes = {
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
  }).isRequired,
};
