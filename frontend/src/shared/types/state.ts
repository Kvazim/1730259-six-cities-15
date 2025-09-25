import { AxiosInstance } from 'axios';
import { UserData } from './user-data';
import { FullOffer, Offer, OfferMapItem, Offers } from './offers';
import { Reviews } from './reviews';
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { store } from '../../store';
import { AuthorizationStatus, Cities, SortType, Status } from '../lib/const/const';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
}

export type PlacesProcess = {
  currentOffer: OfferMapItem | null;
}

export type SortingTypeProcess = {
  sortingType: SortType;
}

export type CityProcess = {
  currentCity: Cities;
}

export type FavoriteProcess = {
  favoriteOffers: Offers;
  favoriteOffersLoadingStatus: Status;
  favoriteUpdateOffersLoadingStatus: Status;
}

export type ReviewProcess = {
  reviews: Reviews;
  reviewsLoadingStatus: Status;
  addReviewsLoadingStatus: Status;
}


//TODO возможно удалить OffersProcess
export type OffersProcess = {
  offers: Offers;
  offersLoadingStatus: Status;
  fullOffer: FullOffer | null;
  fullOfferLoadingStatus: Status;
  currentOfferId: Offer['id'] | null;
  nearByOffers: Offers;
  nearByOffersLoadingStatus: Status;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, AxiosInstance, Action<string>>;

export type Extra = {
  state: State;
  extra: AxiosInstance;
}

