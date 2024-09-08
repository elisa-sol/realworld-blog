import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../redux/actions';
import ArticleItem from '../articleItem/articleItem.jsx';
import { Pagination } from 'antd';

function ArticlesList() {
  const dispatch = useDispatch();
  const { articles, totalPages, currentPage } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(fetchArticles(page));
  };

  return (
    <div>
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
