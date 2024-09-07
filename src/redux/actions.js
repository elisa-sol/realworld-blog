const URL = 'https://blog.kata.academy/api/';

export const fetchArticles = () => async (dispatch) => {
  try {
    const response = await fetch(`${URL}articles`);
    if (!response.ok) {
      console.log('Ошибка загрузки статей');
    }
    const json = await response.json();
    console.log(json);
    dispatch({
      type: 'ARTICLES_LIST_SUCCESS',
      payload: { articles: json.articles },
      totalPages: Math.ceil(json.articlesCount / 10),
    });
  } catch (error) {
    console.log('Ошибка загрузки статей');
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
