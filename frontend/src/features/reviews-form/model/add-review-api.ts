import { baseApi } from '../../../shared/lib/api/base-api';
import { APIRoute, NameSpace } from '../../../shared/lib/const/const';
import { addAppMiddleware, reducer } from '../../../shared/lib/redux';
import { NewReview, Review } from '../../../shared/types/reviews';

const addReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation<Review, NewReview>({
      query: ({id, ...body}) => ({
        url: `${APIRoute.Reviews}/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: NameSpace.Reviews, id }],
    })
  }),
});

reducer.inject(addReviewApi);

addAppMiddleware(addReviewApi.middleware);
