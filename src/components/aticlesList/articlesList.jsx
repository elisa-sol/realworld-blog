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

  return (
    <div>
      <ul>
        {articles.map((article) => (
          <ArticleItem key={article.slug} article={article} />
        ))}
      </ul>
      <Pagination
        current={currentPage}
        totalPages={totalPages}
        pageSize={10}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
    </div>
  );
}

export default ArticlesList;
