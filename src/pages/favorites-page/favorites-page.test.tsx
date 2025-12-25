import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import FavoritesPage from './favorites-page';
import { renderWithProviders } from '../../utils/test-utils';

vi.mock('../../store/action', async () => {
  const actual = await vi.importActual<typeof import('../../store/action')>('../../store/action');
  return {
    ...actual,
    fetchFavoriteOffers: () => () => Promise.resolve(),
  };
});

describe('Page: FavoritesPage', () => {
  it('показывает пустой стейт, когда нет избранных предложений', () => {
    renderWithProviders(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>,
      {
        preloadedState: {
          offersProcess: {
            city: 'Paris',
            offers: [],
            sortType: 'Popular',
            isOffersLoading: false,
            favoriteOffers: [],
            favoriteCount: 0,
          },
        },
      }
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search/i)).toBeInTheDocument();
  });
});

