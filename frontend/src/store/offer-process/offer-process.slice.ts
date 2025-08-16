import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { fetchNearByOffersAction, fetchOfferIdAction, fetchOffersAction, updateFavoriteOffersAction } from '../api-actions';
import { OffersProcess } from '../../types/state';
import { Offer } from '../../types/offers';

const initialState: OffersProcess = {
  offers: [],
  offersLoadingStatus: Status.Idle,
  fullOffer: null,
  fullOfferLoadingStatus: Status.Idle,
  currentOfferId: null,
  nearByOffers: [],
  nearByOffersLoadingStatus: Status.Idle,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setCurrentOfferId: (state, action: PayloadAction<Offer['id'] | null>) => {
      state.currentOfferId = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersLoadingStatus = Status.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersLoadingStatus = Status.Success;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersLoadingStatus = Status.Failed;
      })
      .addCase(fetchOfferIdAction.pending, (state) => {
        state.fullOfferLoadingStatus = Status.Loading;
      })
      .addCase(fetchOfferIdAction.fulfilled, (state, action) => {
        state.fullOffer = action.payload;
        state.fullOfferLoadingStatus = Status.Success;
      })
      .addCase(fetchOfferIdAction.rejected, (state) => {
        state.fullOfferLoadingStatus = Status.Failed;
      })
      .addCase(fetchNearByOffersAction.pending, (state) => {
        state.nearByOffersLoadingStatus = Status.Loading;
      })
      .addCase(fetchNearByOffersAction.fulfilled, (state, action) => {
        state.nearByOffers = action.payload;
        state.nearByOffersLoadingStatus = Status.Success;
      })
      .addCase(fetchNearByOffersAction.rejected, (state) => {
        state.nearByOffersLoadingStatus = Status.Failed;
      })
      .addCase(updateFavoriteOffersAction.fulfilled, (state, action) => {
        const { id, isFavorite } = action.payload;

        state.offers = state.offers.map((offer) =>
          offer.id === id ? { ...offer, isFavorite } : offer
        );

        if (state.fullOffer && state.fullOffer.id === id) {
          state.fullOffer = { ...state.fullOffer, isFavorite };
        }

        state.nearByOffers = state.nearByOffers.map((offer) =>
          offer.id === id ? { ...offer, isFavorite } : offer
        );
      });
  }
});

export const { setCurrentOfferId } = offersData.actions;
