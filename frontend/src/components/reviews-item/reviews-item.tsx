import { memo } from 'react';
import { Review } from '../../types/reviews';
import MemoizedRaitingStars from '../raiting-stars/raiting-stars';

type ReviewsItemProps = {
  review: Review;
}

function ReviewsItem({review}: ReviewsItemProps): JSX.Element {
  const {user, rating, comment, date} = review;

  const itemDate = new Date(date);
  const monthName = itemDate.toLocaleString('en-EN', { month: 'long' });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <MemoizedRaitingStars className='reviews__stars' rating={rating} />
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{monthName} {itemDate.getFullYear()}</time>
      </div>
    </li>
  );
}

const MemoizedReviewsItem = memo(ReviewsItem);

export default MemoizedReviewsItem;
