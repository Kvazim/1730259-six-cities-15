import { createSelector } from '@reduxjs/toolkit';
import { selectReviewsById } from './reviews-api';
import { DEFAULT_ZERO, MAX_REVIEWS_COUNT } from '../../../shared/lib/const/const';
import { Offer } from '../../../shared/types/offers';

export const selectSortingReviews = (id: Offer['id']) => createSelector(
  selectReviewsById(id),
  (reviewsState) => {
    if (reviewsState.isSuccess) {
      const reviews = reviewsState.data.toSorted(
        (reviewFirst, reviewSecond) => new Date(reviewFirst.date).getTime() - new Date(reviewSecond.date).getTime()
      )
        .reverse()
        .slice(DEFAULT_ZERO, MAX_REVIEWS_COUNT);
      return reviews;
    }
    return [];
  }
);
