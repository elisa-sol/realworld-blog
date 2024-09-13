import React, { useEffect } from 'react';

import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import classes from './articlesList.module.scss';
import { fetchArticles } from '../../redux/actions';
import ArticleItem from '../articleItem/articleItem';
import Loader from '../loader/loader';

function ArticlesList() {
  const dispatch = useDispatch();
  const { articles, totalPages, currentPage, isLoading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(fetchArticles(page));
  };

  if (isLoading) return <Loader />;

  return (
    <div className={classes.container}>
      <ul>
        {articles.map((article) => (
          <ArticleItem key={article.slug} article={article} />
        ))}
      </ul>
      <Pagination
        onChange={handlePageChange}
        current={currentPage}
        total={totalPages * 20}
        pageSize={20}
        showSizeChanger={false}
        style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}
      />
    </div>
  );
}

export default ArticlesList;
