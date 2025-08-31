import { APIRoute } from '../../../shared/lib/const/const';
import { addAppMiddleware, reducer } from '../../../shared/lib/redux';
import { Offers } from '../../../shared/types/offers';
import { baseApi } from '../../../shared/lib/api/base-api';

export const placesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlaces: builder.query<Offers, void>({
      query: () => APIRoute.Offers
    }),
  }),
});

reducer.inject(placesApi);

addAppMiddleware(placesApi.middleware);

export const selectPlacesApi = placesApi.endpoints.getPlaces.select();
export const getPlacesPrefetch = placesApi.endpoints.getPlaces.initiate;
