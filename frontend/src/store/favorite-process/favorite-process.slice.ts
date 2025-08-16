import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { FavoriteProcess } from '../../types/state';
import { fetchFavoriteOffersAction, logOutAction, updateFavoriteOffersAction } from '../api-actions';

const initialState: FavoriteProcess = {
  favoriteOffers: [],
  favoriteOffersLoadingStatus: Status.Idle,
  favoriteUpdateOffersLoadingStatus: Status.Idle,
};

export const favoritesData = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.favoriteOffersLoadingStatus = Status.Loading;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.favoriteOffersLoadingStatus = Status.Success;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.favoriteOffersLoadingStatus = Status.Failed;
      })
      .addCase(updateFavoriteOffersAction.pending, (state) => {
        state.favoriteUpdateOffersLoadingStatus = Status.Loading;
      })
      .addCase(updateFavoriteOffersAction.fulfilled, (state, action) => {
        const index = state.favoriteOffers.findIndex((offer) => offer.id === action.payload.id);

        if (index === -1) {
          state.favoriteOffers.push(action.payload);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.id);
        }

        state.favoriteUpdateOffersLoadingStatus = Status.Success;
      })
      .addCase(updateFavoriteOffersAction.rejected, (state) => {
        state.favoriteUpdateOffersLoadingStatus = Status.Failed;
      })
      .addCase(logOutAction.rejected, (state) => {
        state.favoriteOffers = [];
      });
  },
});
