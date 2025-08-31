import { createSelector } from '@reduxjs/toolkit';
import { SortType } from '../../../shared/lib/const/const';
import { getSortingType } from '.';
import { selectFilteredPlaces } from '../../places-list';

export const selectSortingPlaces = createSelector(
  selectFilteredPlaces,
  getSortingType,
  (filteredPlaces, sortingType) => {
    switch (sortingType) {
      case SortType.HightPrice:
        return filteredPlaces.toSorted((a, b) => b.price - a.price);
      case SortType.LowPrice:
        return filteredPlaces.toSorted((a, b) => a.price - b.price);
      case SortType.Rating:
        return filteredPlaces.toSorted((a, b) => b.rating - a.rating);
      default:
        return filteredPlaces;
    }
  }
);
