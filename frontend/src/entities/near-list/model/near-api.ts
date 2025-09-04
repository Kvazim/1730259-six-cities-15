import { baseApi } from '../../../shared/lib/api/base-api';
import { APIRoute, NameSpace } from '../../../shared/lib/const/const';
import { addAppMiddleware, reducer } from '../../../shared/lib/redux';
import { Offer, Offers } from '../../../shared/types/offers';

export const nearApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNear: builder.query<Offers, Offer['id']>({
      query: (id) => `${APIRoute.Offers}/${id}/${APIRoute.Nearby}`,
      providesTags: (_, __, id) => [{ type: NameSpace.Near, id }],
    }),
  }),
});

reducer.inject(nearApi);

addAppMiddleware(nearApi.middleware);

export const selectNear = (id: Offer['id']) => nearApi.endpoints.getNear.select(id);
export const getNearPrefetch = nearApi.endpoints.getNear.initiate;
