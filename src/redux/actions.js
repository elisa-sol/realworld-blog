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
      console.log(json);
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
  dispatch({ type: 'ARTICLES_REQUEST' });
  try {
    const response = await fetch(`${URL}articles/${slug}`);
    if (!response.ok) {
      console.log('Ошибка разворота статьи1');
    }
    const json = await response.json();
    dispatch({
      type: 'ARTICLE_EXPAND_SUCCESS',
      payload: json.article,
    });
  } catch (error) {
    console.log('Ошибка разворота статьи2');
  }
};

// export const signUp = (userData) => async (dispatch) => {
//   try {
//     const response = await fetch(`${URL}users`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ user: userData }),
//     });
//
//     if (!response.ok) {
//       console.log('Ошибка регистрации1');
//       return;
//     }
//
//     const json = await response.json();
//     dispatch({ type: 'USER_SIGNUP_SUCCESS', payload: json.user });
//   } catch (error) {
//     console.log('Ошибка регистрации2');
//   }
// };

export const signUp = (userData) => async (dispatch) => {
  try {
    const response = await fetch(`${URL}users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Ошибка регистрации:', errorData);
      throw new Error('Ошибка регистрации. Пожалуйста, проверьте введенные данные.');
    }

    const json = await response.json();
    dispatch({ type: 'USER_SIGNUP_SUCCESS', payload: json.user });
    return json.user.token;
  } catch (error) {
    console.log('Ошибка регистрации:', error.message);
    throw error;
  }
};

// export const signIn = (userData) => async (dispatch) => {
//   try {
//     const response = await fetch(`${URL}users/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ user: userData }),
//     });
//
//     if (!response.ok) {
//       console.log('Ошибка авторизации1');
//       return;
//     }
//
//     const json = await response.json();
//     dispatch({ type: 'USER_SIGNIN_SUCCESS', payload: json.user });
//   } catch (error) {
//     console.log('Ошибка авторизации2');
//   }
// };

export const signIn = (userData) => async (dispatch) => {
  try {
    const response = await fetch(`${URL}users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Ошибка авторизации:', errorData);
      return dispatch({ type: 'USER_SIGNIN_FAILURE', payload: errorData });
    }

    const json = await response.json();
    const { token, username } = json.user;

    localStorage.setItem('jwtToken', token);

    dispatch({ type: 'USER_SIGNIN_SUCCESS', payload: json.user });
    // return json.user.token;
    return { token, username };
  } catch (error) {
    console.log('Ошибка авторизации', error.message);
    dispatch({ type: 'USER_SIGNIN_FAILURE', payload: { message: error.message } });
    throw error;
  }
};

export const editProfile = (userData, token) => async (dispatch) => {
  try {
    const response = await fetch(`${URL}user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userData }),
    });

    if (!response.ok) {
      console.log('Ошибка редактирования профиля-1');
      // return null;
    }

    const json = await response.json();
    dispatch({ type: 'USER_EDITING_SUCCESS', payload: json.user });

    return json.user;
  } catch (error) {
    console.log('Ошибка редактирования профиля-2:', error);
    return null;
  }
};
