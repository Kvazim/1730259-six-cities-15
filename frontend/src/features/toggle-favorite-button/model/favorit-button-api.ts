import { placesByIdApi } from '../../../entities';
import { baseApi } from '../../../shared/lib/api/base-api';
import { APIRoute } from '../../../shared/lib/const/const';
import { addAppMiddleware, reducer } from '../../../shared/lib/redux';
import { FullOffer } from '../../../shared/types/offers';

export const favoritButtonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleFavorite: builder.mutation<FullOffer, { id: string; isFavorite: boolean }>({
      query: ({ id, isFavorite }) => ({
        url: `${APIRoute.Favorite}/${id}/${Number(!isFavorite)}`,
        method: 'POST',
      }),
      onQueryStarted: async ({ id, isFavorite }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          placesByIdApi.util.updateQueryData('getPlacesById', id, (draft) => {
            draft.isFavorite = !isFavorite;
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

reducer.inject(favoritButtonApi);

addAppMiddleware(favoritButtonApi.middleware);

export const { useToggleFavoriteMutation } = favoritButtonApi;
