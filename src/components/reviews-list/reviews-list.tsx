import { memo, useMemo } from 'react';
import Review from '../review/review.tsx';
import type { Review as ReviewType } from '../../types/review';

type ReviewsListProps = {
  reviews: ReviewType[];
};

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  const sortedReviews = useMemo(() => [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10), [reviews]);

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

const MemoReviewsList = memo(ReviewsList);

export default MemoReviewsList;

