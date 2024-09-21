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

export const likedArticle = createAsyncThunk('articles/likedArticle', async (slug, thunkAPI) => {
  try {
    const token = thunkAPI.getState().users.token;

    if (!token) {
      return thunkAPI.rejectWithValue('Токен не найден');
    }

    const isLiked = thunkAPI.getState().articles.isLiked[slug] || false;
    const action = isLiked ? 'DELETE' : 'POST';

    const response = await fetch(`${URL}articles/${slug}/favorite`, {
      method: action,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue('Ошибка оценивания статьи');
    }

    return { slug, isLiked: !isLiked };
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка оценивания статьи');
  }
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    likedArticles: JSON.parse(localStorage.getItem('likedArticles')) || [],
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
    localUser: null,
    successMessage: '',
    isLiked: {},
    likesCount: {},
    currentPage: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    setIsLiked: (state, action) => {
      const { slug, isLiked } = action.payload;
      state.isLiked[slug] = isLiked;
    },
    setLikesCount: (state, action) => {
      const { slug, count } = action.payload;
      state.likesCount[slug] = count;
    },
    setTagList: (state, action) => {
      state.tagList = action.payload;
    },
    updateLikedArticles: (state, action) => {
      state.likedArticles = action.payload;
      localStorage.setItem('likedArticles', JSON.stringify(action.payload));
    },
  },
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

      .addCase(likedArticle.fulfilled, (state, action) => {
        const { slug, isLiked } = action.payload;
        const article = state.articles.find((a) => a.slug === slug);

        if (article) {
          article.favoritesCount += isLiked ? 1 : -1;
        }

        state.isLiked[slug] = isLiked;
        state.likesCount[slug] = isLiked ? (state.likesCount[slug] || 0) + 1 : (state.likesCount[slug] || 0) - 1;

        if (isLiked) {
          state.likedArticles.push(slug);
        } else {
          state.likedArticles = state.likedArticles.filter((likedSlug) => likedSlug !== slug); // Удаляем статью, если лайк убран
        }

        localStorage.setItem('likedArticles', JSON.stringify(state.likedArticles));
      })

      .addCase(likedArticle.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setSuccessMessage, setIsLiked, setLikesCount, setTagList, updateLikedArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
