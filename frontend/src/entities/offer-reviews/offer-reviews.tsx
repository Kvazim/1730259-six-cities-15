import { memo, ReactNode } from 'react';
import MemoizedReviewsItem from '../../shared/ui/reviews-item/reviews-item';
import { Offer } from '../../shared/types/offers';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../shared/lib/redux';
import { selectSortingReviews } from './model';

type OfferReviewsProps = {
  children?: ReactNode;
}

function OfferReviews({children}: OfferReviewsProps): JSX.Element {
  const { id } = useParams<{ id: Offer['id'] }>();

  const reviews = useAppSelector(selectSortingReviews(id!));

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {
          reviews.map((review) => <MemoizedReviewsItem key={review.id} review={review} />)
        }
      </ul>
      {children}
    </section>
  );
}

const MemoizedOfferReviews = memo(OfferReviews);

export { MemoizedOfferReviews };
