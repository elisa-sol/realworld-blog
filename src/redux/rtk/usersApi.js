import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { loginUser } from '../slices/usersSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
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
    // Регистрация пользователя
    signUp: builder.mutation({
      query: (userData) => ({
        url: 'users',
        method: 'POST',
        body: { user: userData },
      }),
      async onQueryStarted(userData, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token, username, email, image } = data.user;

          dispatch(loginUser({ token, username, email, image }));
        } catch (error) {
          console.error('Ошибка регистрации:', error);
        }
      },
    }),

    // Вход пользователя
    signIn: builder.mutation({
      query: (userData) => ({
        url: 'users/login',
        method: 'POST',
        body: { user: userData },
      }),
      async onQueryStarted(userData, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token, username, email, image } = data.user;

          dispatch(loginUser({ token, username, email, image }));
        } catch (error) {
          console.error('Ошибка авторизации:', error);
        }
      },
    }),
    // Редактирование профиля
    editProfile: builder.mutation({
      query: (userData) => {
        const updatedUserData = {
          username: userData.username,
          email: userData.email,
          image: userData.image,
        };

        if (userData.password) {
          updatedUserData.password = userData.password;
        }

        return {
          url: 'user',
          method: 'PUT',
          body: { user: updatedUserData },
        };
      },
      async onQueryStarted(userData, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token, username, email, image } = data.user;

          dispatch(loginUser({ token, username, email, image }));
        } catch (error) {
          console.error('Ошибка редактирования профиля:', error);
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useEditProfileMutation } = userApi;
