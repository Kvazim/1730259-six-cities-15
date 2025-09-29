import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, DEFAULT_DELAY_TIME, REQUEST_TIMEOUT } from '../const/const';
import { getToken, Token } from '../utils/token';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

interface ApiErrorResponse {
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: Response) => !!StatusCodeMapping[response.status];

export const createBaseQuery = () => fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: Token = getToken();

    if (token) {
      headers.set('X-Token', token);
    }

    headers.set('Content-Type', 'application/json');
    return headers;
  },
  validateStatus: (response, body: ApiErrorResponse | undefined) => {
    if (response && shouldDisplayError(response)) {
      const errorMessage = body?.message || 'Произошла ошибка';
      toast.warn(errorMessage, { delay: DEFAULT_DELAY_TIME });
    }

    return response.ok;
  },
  timeout: REQUEST_TIMEOUT
});
