import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../const/const';
import { getToken, Token } from '../utils/token';

export const createBaseQuery = () => fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: Token = getToken();

    if (token) {
      headers.set('X-Token', token);
    }

    headers.set('Content-Type', 'application/json');
    return headers;
  }
});
