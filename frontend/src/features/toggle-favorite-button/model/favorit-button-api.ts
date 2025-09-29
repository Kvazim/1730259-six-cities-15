import { placesByIdApi, nearApi } from '../../../entities';
import { baseApi } from '../../../shared/lib/api/base-api';
import { APIRoute } from '../../../shared/lib/const/const';
import { addAppMiddleware, reducer } from '../../../shared/lib/redux';
import { FullOffer, Offer, Offers } from '../../../shared/types/offers';

export const favoritButtonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleFavorite: builder.mutation<FullOffer, { id: string; isFavorite: boolean }>({
      query: ({ id, isFavorite }) => ({
        url: `${APIRoute.Favorite}/${id}/${Number(!isFavorite)}`,
        method: 'POST',
      }),
      onQueryStarted: async ({ id, isFavorite }, { dispatch, queryFulfilled , getState }) => {
        const patchResult = dispatch(
          placesByIdApi.util.updateQueryData('getPlacesById', id, (draft) => {
            draft.isFavorite = !isFavorite;
          })
        );

        const queries = getState().api.queries;
        const nearPatches: { undo: () => void }[] = [];

        Object.values(queries)
          .forEach((value) => {
            if (value?.endpointName === 'getNear' && value?.originalArgs) {
              const patchResultNear = dispatch(
                nearApi.util.updateQueryData('getNear', value.originalArgs as Offer['id'], (darft: Offers) => {
                  const offerToUpdate = darft.find((offer) => offer.id === id);
                  if (offerToUpdate) {
                    offerToUpdate.isFavorite = !isFavorite;
                  }
                })
              );
              nearPatches.push(patchResultNear);
            }

          });

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          nearPatches.forEach((patch) => patch.undo());
        }
      },
    }),
  }),
});

reducer.inject(favoritButtonApi);

addAppMiddleware(favoritButtonApi.middleware);

export const { useToggleFavoriteMutation } = favoritButtonApi;
