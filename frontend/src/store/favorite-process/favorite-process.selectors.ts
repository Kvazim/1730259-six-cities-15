import { NameSpace, Status } from '../../const';
import { Offers } from '../../types/offers';
import { State } from '../../types/state';

export const getFavoritsData = (state: State): Offers => state[NameSpace.Favorites].favoriteOffers;
export const getFavoriteLoadingStatus = (state: State): Status => state[NameSpace.Favorites].favoriteOffersLoadingStatus;
export const getFavoriteUpdateOffersLoadingStatus = (state: State): Status => state[NameSpace.Favorites].favoriteUpdateOffersLoadingStatus;
