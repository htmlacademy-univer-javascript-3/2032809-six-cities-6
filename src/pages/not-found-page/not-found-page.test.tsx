import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './not-found-page';

describe('Page: NotFoundPage', () => {
  it('должен показывать страницу 404', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /На главную/i })).toHaveAttribute('href', '/');
  });
});

