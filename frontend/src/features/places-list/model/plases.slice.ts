import { PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../../shared/lib/const/const';
import { reducer, createSlice } from '../../../shared/lib/redux';
import { Offer } from '../../../shared/types/offers';
import { PlacesProcess } from '../../../shared/types/state';

const initialState: PlacesProcess = {
  currentOfferId: null,
};

const placesSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  selectors: {
    getCurrentOfferId: (state) => state.currentOfferId,
  },
  reducers: {
    setCurrentOfferId: (state, action: PayloadAction<Offer['id'] | null>) => {
      state.currentOfferId = action.payload;
    }
  }
}).injectInto(reducer);

export const { getCurrentOfferId } = placesSlice.selectors;
export const { setCurrentOfferId } = placesSlice.actions;
