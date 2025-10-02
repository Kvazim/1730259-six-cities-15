import { baseApi } from '../../../shared/lib/api/base-api';
import { APIRoute } from '../../../shared/lib/const/const';
import { addAppMiddleware, reducer, startAppListening } from '../../../shared/lib/redux';
import { FullOffer } from '../../../shared/types/offers';
import { favoriteListenerConfig } from './favorite.listener.config.ts';

export const favoritButtonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleFavorite: builder.mutation<FullOffer, { id: string; isFavorite: boolean }>({
      query: ({ id, isFavorite }) => ({
        url: `${APIRoute.Favorite}/${id}/${Number(!isFavorite)}`,
        method: 'POST',
      }),
    }),
  }),
});

reducer.inject(favoritButtonApi);

addAppMiddleware(favoritButtonApi.middleware);

startAppListening(favoriteListenerConfig);

export const { useToggleFavoriteMutation } = favoritButtonApi;
