import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'https://blog.kata.academy/api/';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async ({ page = 1, limit = 20 }, thunkAPI) => {
  try {
    const offset = (page - 1) * limit;
    const response = await fetch(`${URL}articles?limit=${limit}&offset=${offset}`);

    if (!response.ok) {
      return thunkAPI.rejectWithValue('Ошибка загрузки статей');
    }

    const json = await response.json();

    return {
      articles: json.articles,
      totalPages: Math.ceil(json.articlesCount / limit),
      currentPage: page,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка загрузки статей');
  }
});

export const watchArticle = createAsyncThunk('articles/watchArticle', async (slug, thunkAPI) => {
  try {
    const response = await fetch(`${URL}articles/${slug}`);

    if (!response.ok) {
      return thunkAPI.rejectWithValue('Ошибка разворота статьи1');
    }

    const json = await response.json();
    return json.article;
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка разворота статьи2');
  }
});

export const addArticle = createAsyncThunk('articles/addArticle', async ({ articleData, token }, thunkAPI) => {
  try {
    const response = await fetch(`${URL}articles`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ article: articleData }),
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue('Ошибка добавления статьи1');
    }
    const json = await response.json();

    return json.article;
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка добавления статьи2');
  }
});

export const editArticle = createAsyncThunk('articles/editArticle', async ({ articleData, slug, token }, thunkAPI) => {
  try {
    const response = await fetch(`${URL}articles/${slug}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ article: articleData }),
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue('Ошибка редактирования статьи1');
    }

    const json = await response.json();

    return json.article;
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка редактирования статьи2');
  }
});

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (slug, token, thunkAPI) => {
  try {
    const response = await fetch(`${URL}articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue('Ошибка удаления статьи1');
    }

    return slug;
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка удаления статьи2');
  }
});

export const likedArticle = createAsyncThunk('articles/likedArticle', async (slug, token, action, thunkAPI) => {
  try {
    const response = await fetch(`${URL}articles/${slug}/favorite`, {
      method: action === 'like' ? 'POST' : 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue('Ошибка оценивания статьи1');
    }

    return slug;
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка оценивания статьи2');
  }
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    article: {
      slug: '',
      title: '',
      favoritesCount: 0,
      createdAt: '',
      description: '',
      tagList: [],
      author: {
        username: '',
        image: '',
      },
      body: '',
    },
    currentPage: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.isLoading = false;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(watchArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(watchArticle.fulfilled, (state, action) => {
        state.article = action.payload;
        state.isLoading = false;
      })
      .addCase(watchArticle.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(addArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles.push(action.payload);
        state.error = null;
      })
      .addCase(addArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(editArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.articles = state.articles.map((article) =>
          article.slug === action.payload.slug ? action.payload : article
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter((article) => article.slug !== action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(likedArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likedArticle.fulfilled, (state, action) => {
        state.articles = state.articles.map((article) =>
          article.slug === action.payload ? { ...article, favoritesCount: article.favoritesCount + 1 } : article
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(likedArticle.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default articlesSlice.reducer;
