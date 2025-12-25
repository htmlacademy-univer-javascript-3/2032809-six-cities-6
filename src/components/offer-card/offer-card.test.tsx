import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OfferCard from './offer-card';
import { renderWithProviders } from '../../utils/test-utils';
import { makeFakeOffer } from '../../utils/test-mocks';
import { AuthorizationStatus } from '../../const';

describe('Component: OfferCard', () => {
  it('должен перенаправлять на страницу логина при клике по избранному у неавторизованного', async () => {
    const user = userEvent.setup();
    const offer = makeFakeOffer({ isFavorite: false });

    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<OfferCard offer={offer} />} />
          <Route path="/login" element={<div data-testid="login-page" />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          userProcess: { authorizationStatus: AuthorizationStatus.NoAuth, userData: null },
        },
      }
    );

    await user.click(screen.getByRole('button', { name: /to bookmarks/i }));

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});

