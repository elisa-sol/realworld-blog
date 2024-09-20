import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles } from './articlesSlice.js';

const URL = 'https://blog.kata.academy/api/';

export const signUp = createAsyncThunk('users/signUp', async (userData, thunkAPI) => {
  try {
    const response = await fetch(`${URL}users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userData }),
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue('Ошибка регистрации1');
    }

    const json = await response.json();
    const { token, username, email, image } = json.user;

    localStorage.setItem('jwtToken', token);

    return { token, username, email, image };
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка регистрации2');
  }
});

export const signIn = createAsyncThunk('users/signIn', async (userData, thunkAPI) => {
  try {
    const response = await fetch(`${URL}users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userData }),
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue('Ошибка авторизации1');
    }

    const json = await response.json();
    const { token, username, email, image } = json.user;

    localStorage.setItem('jwtToken', token);

    return { token, username, email, image };
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка авторизации2');
  }
});

export const editProfile = createAsyncThunk('users/editProfile', async (userData, token, thunkAPI) => {
  try {
    const response = await fetch(`${URL}user`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userData }),
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue('Ошибка редактирования1');
    }

    const json = await response.json();
    const { token: responseToken, image } = json.user;

    localStorage.setItem('jwtToken', json.user.token);

    return { token: responseToken, image };
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка редактировани2я');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    token: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          username: action.payload.username,
          email: action.payload.email,
          image: action.payload.image,
        };
        state.token = action.payload.token || state.token;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token || state.token;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(editProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token || state.token;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
