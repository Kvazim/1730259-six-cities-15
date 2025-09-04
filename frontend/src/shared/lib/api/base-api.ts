import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './base-query';
import { NameSpace } from '../const/const';

export const baseApi = createApi({
  baseQuery: createBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [NameSpace.User, NameSpace.Offers, NameSpace.Reviews]
});
