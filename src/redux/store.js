import { configureStore } from '@reduxjs/toolkit';

import { articleApi } from './rtk/articlesApi';
import { userApi } from './rtk/usersApi';
import articlesReducer from './slices/articlesSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [userApi.reducerPath]: userApi.reducer,
    articles: articlesReducer,
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(articleApi.middleware),
});

export default store;
