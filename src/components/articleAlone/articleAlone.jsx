import React, { useEffect } from 'react';

import { HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Markdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { watchArticle } from '../../redux/actions';
import classes from '../articleItem/articleItem.module.scss';
import Loader from '../loader/loader';

function ArticleAlone() {
  const dispatch = useDispatch();
  const { article } = useSelector((state) => state);
  const { slug } = useParams();

  useEffect(() => {
    dispatch(watchArticle(slug));
  }, [dispatch, slug]);

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
    </div>
  );
}

export default ArticleAlone;
