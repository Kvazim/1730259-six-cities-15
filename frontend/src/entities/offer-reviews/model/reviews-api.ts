import { baseApi } from '../../../shared/lib/api/base-api';
import { APIRoute, NameSpace } from '../../../shared/lib/const/const';
import { addAppMiddleware, reducer } from '../../../shared/lib/redux';
import { Offer } from '../../../shared/types/offers';
import { Reviews } from '../../../shared/types/reviews';

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsById: builder.query<Reviews, Offer['id']>({
      query: (id) => `${APIRoute.Reviews}/${id}`,
      providesTags: (_, __, id) => [{ type: NameSpace.Reviews, id }],
    }),
  }),
});

reducer.inject(reviewsApi);

addAppMiddleware(reviewsApi.middleware);

export const selectReviewsById = (id: Offer['id']) => reviewsApi.endpoints.getReviewsById.select(id);
export const getReviewsByIdPrefetch = reviewsApi.endpoints.getReviewsById.initiate;
