import { Fragment, ChangeEvent, memo } from 'react';
import { STARS } from '../../const';

type ReviewsRaitingStarsProps = {
  isChecked: string;
  isDisabled: boolean;
  handleChangeChecked: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

function ReviewsRaitingStars({isChecked, isDisabled, handleChangeChecked}: ReviewsRaitingStarsProps): JSX.Element {
  const isNumberStar = (index: number) => STARS.length - index;

  return (
    <div className="reviews__rating-form form__rating">
      {
        STARS.map((title, index) => (
          <Fragment key={title}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={isNumberStar(index)}
              id={`${isNumberStar(index)}-stars`}
              checked={Number(isChecked) === isNumberStar(index)}
              type="radio"
              disabled={isDisabled}
              onChange={handleChangeChecked}
            />
            <label
              htmlFor={`${isNumberStar(index)}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))
      }
    </div>
  );
}

const MemoizedReviewsRaitingStars = memo(ReviewsRaitingStars);

export default MemoizedReviewsRaitingStars;
