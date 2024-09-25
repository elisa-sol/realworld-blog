import React from 'react';

import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import classes from './articlesList.module.scss';
import { useFetchArticlesQuery } from '../../redux/rtk/articlesApi';
import { setCurrentPage } from '../../redux/slices/articlesSlice';
import ArticleItem from '../articleItem/articleItem';
import Loader from '../loader/loader';

function ArticlesList() {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.articles);
  const { data, error, isLoading } = useFetchArticlesQuery({ page: currentPage });

  const handlePageChange = (page) => {
    dispatch(setCurrentPage({ page }));
  };

  if (isLoading) return <Loader />;

  if (error) return <p>Ошибка загрузки статей</p>;

  return (
    <div className={classes.container}>
      <ul>
        {Array.isArray(data.articles) &&
          data.articles.map((article) => <ArticleItem key={article.slug} article={article} />)}
      </ul>
      <Pagination
        onChange={handlePageChange}
        current={currentPage}
        total={data.totalPages * 20}
        pageSize={20}
        showSizeChanger={false}
        style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}
      />
    </div>
  );
}

export default ArticlesList;
