import { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_SORT, NameSpace, SortType } from '../../../shared/lib/const/const';
import { reducer, createSlice } from '../../../shared/lib/redux';
import { SortingTypeProcess } from '../../../shared/types/state';

const initialState: SortingTypeProcess = {
  sortingType: DEFAULT_SORT,
};

const sortingSlice = createSlice({
  name: NameSpace.Sorting,
  initialState,
  selectors: {
    getSortingType: (state) => state.sortingType,
  },
  reducers: {
    setSortingType: (state, action: PayloadAction<SortType>) => {
      state.sortingType = action.payload;
    }
  }
}).injectInto(reducer);

export const { getSortingType } = sortingSlice.selectors;
export const { setSortingType } = sortingSlice.actions;
