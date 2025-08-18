import { NameSpace, Status } from '../../shared/lib/const/const';
import { Offers } from '../../shared/types/offers';
import { State } from '../../shared/types/state';

export const getFavoritsData = (state: State): Offers => state[NameSpace.Favorites].favoriteOffers;
export const getFavoriteLoadingStatus = (state: State): Status => state[NameSpace.Favorites].favoriteOffersLoadingStatus;
export const getFavoriteUpdateOffersLoadingStatus = (state: State): Status => state[NameSpace.Favorites].favoriteUpdateOffersLoadingStatus;
