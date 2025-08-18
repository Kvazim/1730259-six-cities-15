import { memo } from 'react';
import MemoizedRaitingStars from '../raiting-stars/raiting-stars';

type OfferRatingProps ={
  rating: number;
}

function OfferRating({rating}: OfferRatingProps): JSX.Element {
  return (
    <div className="offer__rating rating">
      <MemoizedRaitingStars className='offer__stars' rating={rating} />
      <span className="offer__rating-value rating__value">{rating}</span>
    </div>
  );
}

const MemoizedOfferRating = memo(OfferRating);

export default MemoizedOfferRating;
