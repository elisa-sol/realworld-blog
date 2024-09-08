const URL = 'https://blog.kata.academy/api/';

export const fetchArticles =
  (page = 1, limit = 20) =>
  async (dispatch) => {
    dispatch({ type: 'ARTICLES_REQUEST' });
    try {
      const offset = (page - 1) * limit;
      const response = await fetch(`${URL}articles?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        console.log('Ошибка загрузки статей1');
      }
      const json = await response.json();
      console.log(json.articles.length);
      dispatch({
        type: 'ARTICLES_LIST_SUCCESS',
        payload: {
          articles: json.articles,
          totalPages: Math.ceil(json.articlesCount / limit),
          currentPage: page,
        },
      });
    } catch (error) {
      console.log('Ошибка загрузки статей2');
    }
  };

export const watchArticle = (slug) => async (dispatch) => {
  // try {
  const response = await fetch(`${URL}articles/${slug}`);
  if (!response.ok) {
    console.log('Ошибка разворота статьи');
  }
  const json = await response.json();
  dispatch({
    type: 'ARTICLE_EXPAND_SUCCESS',
    payload: json.article,
  });
  // }
};
