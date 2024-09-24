import { configureStore } from '@reduxjs/toolkit';

import { userApi } from './rtk/usersApi';
import articlesReducer from './slices/articlesSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [userApi.reducerPath]: userApi.reducer,
    articles: articlesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
