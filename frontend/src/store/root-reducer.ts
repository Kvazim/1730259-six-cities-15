import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process.slice';
import { offersData } from './offer-process/offer-process.slice';
import { favoritesData } from './favorite-process/favorite-process.slice';
import { reviewsData } from './review-process/review-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Favorites]: favoritesData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
});
