import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIRoute, BASE_URL } from '../../../shared/lib/const/const';
import { dropToken, getToken, saveToken, Token } from './token';
import { UserData } from '../../../shared/types/user-data';
import { addAppMiddleware, reducer } from '../../../shared/lib/redux';
import { AuthData } from '../../../shared/types/auth-data';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token: Token = getToken();

      if (token) {
        headers.set('X-Token', token);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  tagTypes: ['UserAuth'],
  endpoints: (builder) => ({
    checkAuth: builder.query<UserData, void>({
      query: () => APIRoute.Login,
    }),
    login: builder.mutation<UserData, AuthData>({
      query: (credentials) => ({
        url:APIRoute.Login,
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['UserAuth'],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const {data} = await queryFulfilled;
          const token = data.token;
          saveToken(token);
        } catch (error) {
          throw new Error(`Ошибка авторизации: ${JSON.stringify(error)}`);
        }
      }
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url:APIRoute.Logout,
        method: 'POST',
      }),
      invalidatesTags: ['UserAuth'],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          dropToken();
        } catch (error) {
          throw new Error(`Ошибка авторизации: ${JSON.stringify(error)}`);
        }
      }
    }),
  }),
});

reducer.inject(userApi);

addAppMiddleware(userApi.middleware);

export const {
  useCheckAuthQuery,
  useLoginMutation,
  useLogoutMutation,
} = userApi;
