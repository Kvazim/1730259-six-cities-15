import { createSelector } from '@reduxjs/toolkit';
import { selectPlacesApi } from './places-api';
import { getCurrentCity } from '../../../entities';

export const selectFilteredPlaces = createSelector(
  selectPlacesApi,
  getCurrentCity,
  (placesState, currentCity) => {
    if (placesState.isSuccess) {
      const places = placesState.data.filter(
        (offer) =>
          currentCity.toLowerCase() === offer.city.name.toLowerCase()
      );
      return places;
    }
    return [];
  }
);
