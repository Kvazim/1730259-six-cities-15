import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useState } from 'react';
import MemoizedReviewsRaitingStars from '../../shared/ui/reviews-raiting-stars/reviews-raiting-stars';
import { MAX_VALUE_REVIEW_LENGHT, MIN_VALUE_REVIEW_LENGHT, STAR_NAME } from '../../shared/lib/const/const';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Offer } from '../../shared/types/offers';
import { useAddReviewMutation } from './model';

function ReviewsForm() {
  const { id } = useParams<{ id: Offer['id'] }>();
  const [isChecked, setIsChecked] = useState('0');
  const [value, setValue] = useState('');
  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const [ addReview, { isLoading, isSuccess, isError } ] = useAddReviewMutation();

  const handleChangeChecked = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.name === STAR_NAME) {
      setIsChecked(target.value);
    }
  }, []);

  const handleTextariaInputChange = useCallback(({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(target.value);
  }, []);

  useEffect(() => {
    setIsSubmitActive(
      isChecked === '0' ||
      value.length < MIN_VALUE_REVIEW_LENGHT ||
      value.length > MAX_VALUE_REVIEW_LENGHT
    );
  }, [isChecked, value.length]);

  const resetForm = () => {
    setIsChecked('0');
    setValue('');
  };

  useEffect(() => {
    if (isSuccess) {
      resetForm();
    }
  }, [isSuccess]);

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (value && isChecked) {
      addReview({
        id: id!,
        comment: value,
        rating: Number(isChecked)
      }).unwrap();
    }

    if (isError) {
      toast.warn('Ошибка отправки, попробуйте еще раз');
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <MemoizedReviewsRaitingStars
        isChecked={isChecked}
        handleChangeChecked={handleChangeChecked}
        isDisabled={isLoading}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={value}
        onChange={(evt) => handleTextariaInputChange(evt)}
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isLoading}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitActive || isLoading}>Submit</button>
      </div>
    </form>
  );
}

const MemoizedReviewsForm = memo(ReviewsForm);

export { MemoizedReviewsForm };
