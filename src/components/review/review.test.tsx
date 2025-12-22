import { render, screen } from '@testing-library/react';
import Review from './review';
import { makeFakeReview } from '../../utils/test-mocks';

describe('Component: Review', () => {
  it('должен корректно отображать данные отзыва', () => {
    const review = makeFakeReview({
      user: { name: 'Alex', avatarUrl: 'img/avatar-1.jpg', isPro: true },
      rating: 5,
      comment: 'Perfect stay',
      date: '2020-02-01T00:00:00.000Z',
    });

    render(<Review review={review} />);

    expect(screen.getByText('Alex')).toBeInTheDocument();
    expect(screen.getByText('Perfect stay')).toBeInTheDocument();
    expect(screen.getByText('February 2020')).toBeInTheDocument();
  });
});

