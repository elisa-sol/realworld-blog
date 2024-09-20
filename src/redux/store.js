// import { createStore, compose, applyMiddleware } from 'redux';
// import { thunk } from 'redux-thunk';
//
// import rootReducer from './reducers';
//
// const store = createStore(
//   rootReducer,
//   compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// );
//
// export default store;

import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './slices/articlesSlice';
import usersReducer from './slices/usersSlice';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    users: usersReducer,
  },
});

export default store;
