import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../../shared/lib/const/const';
import { UserProcess } from '../../../shared/types/state';
import { userApi } from './user-api';
import { reducer } from '../../../shared/lib/redux';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

export const userSlicce = createSlice({
  name: NameSpace.User,
  initialState,
  selectors: {
    authStatus: (state) => state.authorizationStatus,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        userApi.endpoints.checkAuth.matchFulfilled,
        (state) => {
          state.authorizationStatus = AuthorizationStatus.Auth;
        })
      .addMatcher(
        userApi.endpoints.checkAuth.matchRejected,
        (state) => {
          state.authorizationStatus = AuthorizationStatus.NoAuth;
        })
      .addMatcher(
        userApi.endpoints.login.matchFulfilled,
        (state) => {
          state.authorizationStatus = AuthorizationStatus.Auth;
        }
      )
      .addMatcher(
        userApi.endpoints.login.matchRejected,
        (state) => {
          state.authorizationStatus = AuthorizationStatus.NoAuth;
        }
      )
      .addMatcher(
        userApi.endpoints.logout.matchFulfilled,
        (state) => {
          state.authorizationStatus = AuthorizationStatus.NoAuth;
        }
      );
  },
}).injectInto(reducer);
