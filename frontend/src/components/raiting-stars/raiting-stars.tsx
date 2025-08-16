import { memo } from 'react';
import { convertRatingToPercentage } from '../../utils/utils';

type RaitingStarsProps = {
  className?: string;
  rating: number;
}

function RaitingStars({className, rating}: RaitingStarsProps): JSX.Element {
  return (
    <div className={`${className} rating__stars`}>
      <span style={{width: convertRatingToPercentage(rating)}}></span>
      <span className="visually-hidden">Rating</span>
    </div>
  );
}

const MemoizedRaitingStars = memo(RaitingStars);

export default MemoizedRaitingStars;
