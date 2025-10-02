import { nearApi, placesByIdApi } from '../../../entities';
import { AppDispatch, AppState } from '../../../shared/lib/redux';
import { Offer } from '../../../shared/types/offers';
import { favoritButtonApi } from './favorit-button-api';

interface GetState {
  api: {
    queries: {
      [key: string]: {
        endpointName: string;
        originalArgs: unknown;
      } | undefined;
    };
  };
}

interface ApiQueries {
  [key: string]: {
    endpointName: string;
    originalArgs: unknown;
  } | undefined;
}

export const favoriteListenerConfig: {
  matcher: typeof favoritButtonApi.endpoints.toggleFavorite.matchFulfilled;
  effect: (
    action: {
      payload: {
        id: Offer['id'];
        isFavorite: Offer['isFavorite'];
      };
    },
    listenerApi: {
      dispatch: AppDispatch;
      getState: () => AppState;
    }
  ) => void;
} = {
  matcher: favoritButtonApi.endpoints.toggleFavorite.matchFulfilled,
  effect: ({ payload }, { dispatch, getState }) => {

    const { id, isFavorite } = payload;

    placesByIdApi.util.updateQueryData('getPlacesById', id, (draft) => {
      if (draft) {
        draft.isFavorite = isFavorite;
      }
    })(dispatch, getState, undefined);

    const state = getState() as typeof getState & GetState;
    const queries = state.api.queries as ApiQueries;

    Object.values(queries).forEach((value) => {
      if (value?.endpointName === 'getNear' && value?.originalArgs) {
        nearApi.util.updateQueryData('getNear', value.originalArgs as Offer['id'], (draft) => {
          if (!draft) {
            return;
          }

          draft.forEach((offer) => {
            if (offer.id === id) {
              offer.isFavorite = isFavorite;
            }
          });
        })(dispatch, getState, undefined);
      }
    });
  },
};

