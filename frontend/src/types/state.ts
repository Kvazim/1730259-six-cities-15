import { AxiosInstance } from 'axios';
import { store } from '../store';
import { AuthorizationStatus, Status } from '../const';
import { UserData } from './user-data';
import { FullOffer, Offer, Offers } from './offers';
import { Reviews } from './reviews';
import { Action, ThunkAction } from '@reduxjs/toolkit';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, AxiosInstance, Action<string>>;

export type Extra = {
  state: State;
  extra: AxiosInstance;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
}

export type OffersProcess = {
  offers: Offers;
  offersLoadingStatus: Status;
  fullOffer: FullOffer | null;
  fullOfferLoadingStatus: Status;
  currentOfferId: Offer['id'] | null;
  nearByOffers: Offers;
  nearByOffersLoadingStatus: Status;
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
