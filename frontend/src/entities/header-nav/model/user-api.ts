import { APIRoute, NameSpace } from '../../../shared/lib/const/const';
import { UserData } from '../../../shared/types/user-data';
import { addAppMiddleware, reducer } from '../../../shared/lib/redux';
import { AuthData } from '../../../shared/types/auth-data';
import { dropToken, saveToken } from '../../../shared/lib/utils/token';
import { baseApi } from '../../../shared/lib/api/base-api';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkAuth: builder.query<UserData, void>({
      query: () => APIRoute.Login,
      providesTags: [NameSpace.User]
    }),
    login: builder.mutation<UserData, AuthData>({
      query: (credentials) => ({
        url:APIRoute.Login,
        method: 'POST',
        body: credentials
      }),
      transformResponse: (response: UserData) => {
        const token = response.token;
        saveToken(token);
        return response;
      },
      invalidatesTags: [NameSpace.User],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url:APIRoute.Logout,
        method: 'DELETE',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dropToken();
        dispatch(userApi.util.resetApiState());
      },
      invalidatesTags: [NameSpace.User],
    }),
  }),
});

reducer.inject(userApi);

addAppMiddleware(userApi.middleware);

export const checkAuthPrefetch = userApi.endpoints.checkAuth.initiate;

export const {
  useCheckAuthQuery,
  useLoginMutation,
  useLogoutMutation,
} = userApi;
