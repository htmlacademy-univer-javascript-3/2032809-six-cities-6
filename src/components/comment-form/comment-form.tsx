import { useState, FormEvent, ChangeEvent } from 'react';

function CommentForm(): JSX.Element {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const isSubmitDisabled = rating === null || comment.length < 50 || comment.length > 300;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // Здесь позже будет отправка на сервер
  };

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((value) => (
          <span key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating === value}
              onChange={handleRatingChange}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="rating">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </span>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;

import { useState, FormEvent, ChangeEvent } from 'react';

type CommentFormProps = {
  onSubmit?: (rating: number, comment: string) => Promise<void> | void;
};

function CommentForm({ onSubmit }: CommentFormProps): JSX.Element {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isValid = rating > 0 && comment.length >= 50 && comment.length <= 300;

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    if (!isValid || isSubmitting) {
      return;
    }
    try {
      setIsSubmitting(true);
      await onSubmit?.(rating, comment);
      // Успех: очистим форму
      setRating(0);
      setComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const titles: Record<number, string> = {
    5: 'perfect',
    4: 'good',
    3: 'not bad',
    2: 'badly',
    1: 'terribly',
  };

  const handleFormSubmit = (evt: FormEvent) => {
    void handleSubmit(evt);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" onChange={handleRatingChange}>
        {[5, 4, 3, 2, 1].map((star) => (
          <span key={star}>
            <input className="form__rating-input visually-hidden" name="rating" value={star} id={`${star}-stars`} type="radio" checked={rating === star} readOnly />
            <label htmlFor={`${star}-stars`} className="reviews__rating-label form__rating-label" title={titles[star]}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </span>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment} onChange={handleCommentChange} disabled={isSubmitting}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
      </div>
    </form>
  );
}

export default CommentForm;


