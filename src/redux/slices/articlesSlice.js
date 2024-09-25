import { createSlice } from '@reduxjs/toolkit';

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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setSuccessMessage, setIsLiked, setLikesCount, setTagList, updateLikedArticles, setCurrentPage } =
  articlesSlice.actions;
export default articlesSlice.reducer;
