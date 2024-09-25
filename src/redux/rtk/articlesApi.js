import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setIsLiked, setLikesCount } from '../slices/articlesSlice';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().users;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Запрос всех статей
    fetchArticles: builder.query({
      query: ({ page = 1, limit = 20 }) => {
        const offset = (page - 1) * limit;
        return `articles?limit=${limit}&offset=${offset}`;
      },
      transformResponse: (response) => ({
        articles: response.articles,
        totalPages: Math.ceil(response.articlesCount / 20),
        currentPage: 1,
      }),
    }),
    // Просмотр одной статьи
    watchArticle: builder.query({
      query: (slug) => `articles/${slug}`,
      transformResponse: (response) => response.article,
    }),
    // Добавление статьи
    addArticle: builder.mutation({
      query: (articleData) => ({
        url: 'articles',
        method: 'POST',
        body: { article: articleData },
      }),
    }),
    // Редактирование статьи
    editArticle: builder.mutation({
      query: ({ articleData, slug }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        body: { article: articleData },
      }),
    }),
    // Удаление статьи
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
      }),
    }),
    // Лайк/диз статьи
    likedArticle: builder.mutation({
      query: ({ slug, isLiked }) => ({
        url: `articles/${slug}/favorite`,
        method: isLiked ? 'DELETE' : 'POST',
      }),
      async onQueryStarted({ slug, isLiked }, { dispatch, queryFulfilled, getState }) {
        try {
          const previousLikesCount = getState().articles.likesCount[slug] || 0;
          dispatch(
            articleApi.util.updateQueryData('watchArticle', slug, (draft) => {
              draft.favoritesCount += isLiked ? -1 : +1;
            })
          );

          await queryFulfilled;

          dispatch(setIsLiked({ slug, isLiked: !isLiked }));
          dispatch(
            setLikesCount({
              slug,
              count: previousLikesCount + (isLiked ? -1 : +1),
            })
          );
        } catch {
          console.log('Ошибка при изменении лайка');
        }
      },
    }),
  }),
});

export const {
  useFetchArticlesQuery,
  useWatchArticleQuery,
  useAddArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useLikedArticleMutation,
} = articleApi;
