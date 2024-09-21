import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const editProfile = createAsyncThunk('users/editProfile', async (userData, thunkAPI) => {
  const token = thunkAPI.getState().users.token;

  if (!token) {
    return thunkAPI.rejectWithValue('Токен не найден');
  }

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
      return thunkAPI.rejectWithValue('Ошибка редактирования профиля');
    }

    const json = await response.json();
    const { token: newToken, image } = json.user;

    localStorage.setItem('jwtToken', newToken);

    return { token: newToken, image };
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при редактировании профиля');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('jwtToken') || null,
    error: null,
    isLoading: false,
    loginError: '',
    successMessage: '',
  },
  reducers: {
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    loginUser: (state, action) => {
      const userToSave = {
        ...action.payload,
        isLoggedIn: true,
        image: action.payload.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
      };
      state.user = userToSave;
      localStorage.setItem('user', JSON.stringify(userToSave));
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('jwtToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const userToSave = {
          username: action.payload.username,
          email: action.payload.email,
          image: action.payload.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        };
        state.user = userToSave;
        state.token = action.payload.token;
        state.isLoading = false;
        state.error = null;
        localStorage.setItem('jwtToken', action.payload.token); // Сохранение токена в localStorage
        localStorage.setItem('user', JSON.stringify(userToSave)); // Сохранение пользователя в localStorage
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const userToSave = {
          username: action.payload.username,
          email: action.payload.email,
          image: action.payload.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
        };
        state.user = userToSave;
        state.token = action.payload.token;
        state.isLoading = false;
        state.error = null;
        localStorage.setItem('jwtToken', action.payload.token);
        localStorage.setItem('user', JSON.stringify(userToSave));
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

export const { setLoginError, setSuccessMessage, loginUser, logoutUser } = usersSlice.actions;
export default usersSlice.reducer;
