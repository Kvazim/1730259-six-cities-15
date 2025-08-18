import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullOffer, Offer, Offers } from '../shared/types/offers';
import { APIRoute } from '../shared/lib/const/const';
import { AuthData } from '../shared/types/auth-data';
import { UserData } from '../shared/types/user-data';
import { dropToken, saveToken } from '../services/token';
import { NewReview, Review, Reviews } from '../shared/types/reviews';
import { UpdateFavoriteStatus } from '../shared/types/update-favorite-status';
import { Extra } from '../shared/types/state';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, Extra>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferIdAction = createAsyncThunk<FullOffer, Offer['id'], Extra>(
  'data/fetchOfferId',
  async (id: Offer['id'], {extra: api}) => {
    const {data} = await api.get<FullOffer>(`${APIRoute.Offers}/${id}`);
    return data;
  },
);

export const fetchNearByOffersAction = createAsyncThunk<Offers, Offer['id'], Extra>(
  'data/fetchNearByOffers',
  async (id: Offer['id'], {extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${id}/${APIRoute.Nearby}`);
    return data;
  },
);

export const fetchOfferReviewsAction = createAsyncThunk<Reviews, Offer['id'], Extra>(
  'data/fetchOfferReviews',
  async (id: Offer['id'], {extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Reviews}/${id}`);
    return data;
  },
);

export const addReviewAction = createAsyncThunk<Review, NewReview, Extra>(
  'data/setNewReview',
  async ({id, comment, rating}, {extra: api}) => {
    const {data} = await api.post<Review>(`${APIRoute.Reviews}/${id}`, {comment, rating});
    return data;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offers, undefined, Extra>(
  'data/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Favorite);
    return data;
  },
);

export const updateFavoriteOffersAction = createAsyncThunk<Offer, UpdateFavoriteStatus, Extra>(
  'data/updateFavoriteOffers',
  async ({id, status}, {extra: api}) => {
    const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${status}`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, Extra>(
  'user/fetchCheckAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, Extra>(
  'user/login',
  async ({email, password}, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  },
);

export const logOutAction = createAsyncThunk<void, undefined, Extra>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
