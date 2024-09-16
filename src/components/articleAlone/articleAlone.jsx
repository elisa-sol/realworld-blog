import React, { memo, useCallback, useEffect, useState } from 'react';

import { HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Markdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { watchArticle } from '../../redux/actions';
import classes from '../articleItem/articleItem.module.scss';
import Loader from '../loader/loader';

function ArticleAlone() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { article } = useSelector((state) => state);
  const { slug } = useParams();
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setLocalUser(user);
  }, []);

  useEffect(() => {
    dispatch(watchArticle(slug));
  }, [dispatch, slug]);

  const currentUser = useSelector((state) => state.article.author.username);
  console.log(currentUser);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (localUser && currentUser && article.author.username === localUser.username) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [localUser, currentUser, article.author.username]);

  const handleEdit = () => {};

  const handleDelete = useCallback(() => {
    if (isOwner) {
      console.log('Удалить пост');
    } else {
      console.log('Вы не можете удалить этот пост');
    }
  }, [isOwner]);

  console.log(isOwner);

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
            <HeartOutlined className={classes.heart} style={{ fontSize: '18px' }} />
            <div className={classes.likes}>{article.favoritesCount}</div>
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
          <button type="button" className={classes.delete} onClick={handleDelete}>
            Delete
          </button>
          <Link className={classes.edit} to={`/articles/${article.slug}/edit`} style={{ textDecoration: 'none' }}>
            Edit
          </Link>
        </div>
      )}
    </div>
  );
}

export default memo(ArticleAlone);
