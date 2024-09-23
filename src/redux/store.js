// import { configureStore } from '@reduxjs/toolkit';
//
// import articlesReducer from './slices/articlesSlice';
// import usersReducer from './slices/usersSlice';
//
// const store = configureStore({
//   reducer: {
//     articles: articlesReducer,
//     users: usersReducer,
//   },
// });
//
// export default store;
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './rtk/usersApi.js';
import usersReducer from './slices/usersSlice.js';
import articlesReducer from './slices/articlesSlice.js';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [userApi.reducerPath]: userApi.reducer,
    articles: articlesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import { userApi } from './rtk/usersApi.js';
//
// const store = configureStore({
//   reducer: {
//     [userApi.reducerPath]: userApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware), // Добавляем middleware RTK Query
// });
