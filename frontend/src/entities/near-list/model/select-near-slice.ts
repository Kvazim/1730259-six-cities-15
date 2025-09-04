import { createSelector } from '@reduxjs/toolkit';
import { Offer } from '../../../shared/types/offers';
import { selectNear } from './near-api';
import { DEFAULT_ZERO, MAX_NIAR_OFFER } from '../../../shared/lib/const/const';

export const selectNearSlice = (id: Offer['id']) => createSelector(
  selectNear(id),
  (NearState) => {
    if (NearState.isSuccess) {
      const near = NearState.data.slice(DEFAULT_ZERO, MAX_NIAR_OFFER);
      return near;
    }
    return [];
  }
);
