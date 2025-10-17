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
    if (!isValid || isSubmitting) return;
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

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" onChange={handleRatingChange}>
        {[5, 4, 3, 2, 1].map((star) => (
          <span key={star}>
            <input className="form__rating-input visually-hidden" name="rating" value={star} id={`${star}-stars`} type="radio" checked={rating === star} readOnly />
            <label htmlFor={`${star}-stars`} className="reviews__rating-label form__rating-label" title={star === 5 ? 'perfect' : star === 4 ? 'good' : star === 3 ? 'not bad' : star === 2 ? 'badly' : 'terribly'}>
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


