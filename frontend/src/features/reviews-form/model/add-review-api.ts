import { toast } from 'react-toastify';
import { reviewsApi } from '../../../entities';
import { baseApi } from '../../../shared/lib/api/base-api';
import { APIRoute } from '../../../shared/lib/const/const';
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
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const { data: savedReview } = await queryFulfilled;

          dispatch(
            reviewsApi.util.updateQueryData('getReviewsById', id, (draft) => {
              draft.unshift(savedReview);
            })
          );
          toast.success('Отзыв успешно добавлен');
        } catch (error) {
          toast.warn('Ошибка добавления отзыва, попробуйте еще раз');
          throw error;
        }
      },
    })
  }),
});

reducer.inject(addReviewApi);

addAppMiddleware(addReviewApi.middleware);

export const { useAddReviewMutation } = addReviewApi;
