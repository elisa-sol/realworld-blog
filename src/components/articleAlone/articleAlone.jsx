import React, { memo, useCallback, useEffect, useState } from 'react';

import { HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Markdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { watchArticle, deleteArticle } from '../../redux/actions';
import classes from '../articleItem/articleItem.module.scss';
import Loader from '../loader/loader';
import { Alert, Popconfirm } from 'antd';

function ArticleAlone() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { article } = useSelector((state) => state);
  const { slug } = useParams();
  const [localUser, setLocalUser] = useState(null);
  const token = localStorage.getItem('jwtToken');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setLocalUser(user);
  }, []);

  useEffect(() => {
    dispatch(watchArticle(slug));
  }, [dispatch, slug]);

  const currentUser = useSelector((state) => state.article.author.username);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (localUser && currentUser && article.author.username === localUser.username) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [localUser, currentUser, article.author.username]);

  const confirm = () => {
    console.log('yes');
    dispatch(deleteArticle(article.slug, token));
    setSuccessMessage('Статья успешно удалена');
    setTimeout(() => {
      navigate('/');
      setSuccessMessage(null);
    }, 1000);
  };
  const cancel = () => {
    console.log('no');
  };

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
