import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../redux/actions';
import ArticleItem from '../articleItem/articleItem.jsx';

function ArticlesList() {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {articles.map((article) => (
          <ArticleItem key={article.slug} article={article} />
        ))}
      </ul>
      {/*<Pagination currentPage={currentPage} totalPages={totalPages} />*/}
    </div>
  );
}

export default ArticlesList;
