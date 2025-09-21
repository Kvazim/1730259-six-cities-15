import { baseApi } from '../../../shared/lib/api/base-api';
import { APIRoute, NameSpace } from '../../../shared/lib/const/const';
import { addAppMiddleware, reducer } from '../../../shared/lib/redux';
import { FullOffer, Offer } from '../../../shared/types/offers';

export const placesByIdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlacesById: builder.query<FullOffer, Offer['id']>({
      query: (id) => `${APIRoute.Offers}/${id}`,
      providesTags: (_, __, id) => [{ type: NameSpace.Offer, id }],
    }),
  }),
});

reducer.inject(placesByIdApi);

addAppMiddleware(placesByIdApi.middleware);

export const { useGetPlacesByIdQuery } = placesByIdApi;

export const selectPlacesById = (id: Offer['id']) => placesByIdApi.endpoints.getPlacesById.select(id);
export const getPlacesByIdPrefetch = placesByIdApi.endpoints.getPlacesById.initiate;
