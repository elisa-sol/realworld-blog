import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('jwtToken') || null,
    error: null,
    isLoading: false,
    loginError: '',
    successMessage: '',
    username: '',
    email: '',
    image: '',
    password: '',
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
      const { token } = action.payload;
      state.token = token;
      state.user = userToSave;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(userToSave));
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('jwtToken');
    },
    updateProfileField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { updateProfileField, setLoginError, setSuccessMessage, loginUser, logoutUser } = usersSlice.actions;
export default usersSlice.reducer;
