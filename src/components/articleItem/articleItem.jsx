import React from 'react';

import classes from './articleItem.module.scss';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { HeartOutlined } from '@ant-design/icons';

// import { Link } from 'react-router-dom';

function ArticleItem({ article }) {
  return (
    <div className={classes['article-item']}>
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.title}>{article.title}</div>
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
            alt="image"
            style={{ width: '46px', height: '46px' }}
          />
          {/*<div className={classes.date}>{format(new Date(article.createdAt), 'MMMM dd, yyyy', { locale: enUS })}</div>*/}
        </div>
      </div>
      <div className={classes.tags}>
        {article.tagList.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
      <div className={classes.description}>{article.description}</div>
    </div>
  );
}

export default ArticleItem;
