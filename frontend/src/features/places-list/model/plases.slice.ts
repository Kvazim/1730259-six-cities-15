import { PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../../shared/lib/const/const';
import { reducer, createSlice } from '../../../shared/lib/redux';
import { OfferMapItem } from '../../../shared/types/offers';
import { PlacesProcess } from '../../../shared/types/state';

const initialState: PlacesProcess = {
  currentOffer: null,
};

const placesSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  selectors: {
    getCurrentOffer: (state) => state.currentOffer,
  },
  reducers: {
    setCurrentOffer: (state, action: PayloadAction<OfferMapItem | null>) => {
      state.currentOffer = action.payload;
    }
  }
}).injectInto(reducer);

export const { getCurrentOffer } = placesSlice.selectors;
export const { setCurrentOffer } = placesSlice.actions;
