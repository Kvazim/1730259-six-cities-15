import { PayloadAction } from '@reduxjs/toolkit/react';
import { Cities, DEFAULT_CITY, NameSpace } from '../../../shared/lib/const/const';
import { createSlice, reducer } from '../../../shared/lib/redux';
import { CityProcess } from '../../../shared/types/state';

const initialState: CityProcess = {
  currentCity: DEFAULT_CITY,
};

export const sitySlice = createSlice({
  name: NameSpace.City,
  initialState,
  selectors: {
    getCurrentCity: (state) => state.currentCity,
  },
  reducers: {
    setCurrentCity: (state, action: PayloadAction<Cities>) => {
      state.currentCity = action.payload;
    },
  }
}).injectInto(reducer);

export const { getCurrentCity } = sitySlice.selectors;
export const { setCurrentCity } = sitySlice.actions;
