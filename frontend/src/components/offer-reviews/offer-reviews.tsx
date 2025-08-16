import { memo, useMemo } from 'react';
import { AuthorizationStatus, DEFAULT_ZERO, MAX_REVIEWS_COUNT } from '../../const';
import { useAppSelector } from '../../hooks';
import MemoizedReviewsForm from '../reviews-form/reviews-form';
import MemoizedReviewsItem from '../reviews-item/reviews-item';
import { Offer } from '../../types/offers';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { getReviewsData } from '../../store/review-process/review-process.selectors';

type OfferReviewsProps = {
  id: Offer['id'];
}

function OfferReviews({id}: OfferReviewsProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const reviews = useAppSelector(getReviewsData);

  const sortingReviews = useMemo(() => (
    reviews
      .slice()
      .sort(
        (reviewFirst, reviewSecond) => new Date(reviewFirst.date).getTime() - new Date(reviewSecond.date).getTime()
      )
      .reverse()
      .slice(DEFAULT_ZERO, MAX_REVIEWS_COUNT)
  ), [reviews]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {
          sortingReviews &&
          sortingReviews.length > DEFAULT_ZERO &&
          sortingReviews.map((review) => <MemoizedReviewsItem key={review.id} review={review} />)
        }
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && <MemoizedReviewsForm id={id} />}
    </section>
  );
}

const MemoizedOfferReviews = memo(OfferReviews);

export default MemoizedOfferReviews;
