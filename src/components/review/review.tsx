import { memo, useMemo } from 'react';
import type { Review as ReviewType } from '../../types/review';

const MAX_RATING = 5;

type ReviewProps = {
  review: ReviewType;
};

function Review({ review }: ReviewProps): JSX.Element {
  const { user, rating, comment, date } = review;
  const monthYear = useMemo(() => {
    const reviewDate = new Date(date);
    return reviewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [date]);
  const ratingPercent = useMemo(() => (Math.round(rating) / MAX_RATING) * 100, [rating]);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${ratingPercent}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>
          {monthYear}
        </time>
      </div>
    </li>
  );
}

const MemoReview = memo(Review);

export default MemoReview;

