import { screen } from '@testing-library/react';
import App from './app';
import { renderWithProviders } from '../../utils/test-utils';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getInitialRootState } from '../../utils/test-mocks';

vi.mock('../../pages/main-page/main-page', () => ({
  default: () => <div data-testid="main-page" />,
}));

vi.mock('../../pages/login-page/login-page', () => ({
  default: () => <div data-testid="login-page" />,
}));

vi.mock('../../pages/favorites-page/favorites-page', () => ({
  default: () => <div data-testid="favorites-page" />,
}));

vi.mock('../../pages/offer-page/offer-page', () => ({
  default: () => <div data-testid="offer-page" />,
}));

vi.mock('../../pages/not-found-page/not-found-page', () => ({
  default: () => <div data-testid="not-found-page" />,
}));

describe('Routing: App', () => {
  it('должен рендерить главную страницу по корневому маршруту', () => {
    window.history.pushState({}, '', AppRoute.Main);

    renderWithProviders(<App />, {
      preloadedState: {
        userProcess: { authorizationStatus: AuthorizationStatus.NoAuth, userData: null },
      },
    });

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('должен рендерить страницу логина, если пользователь не авторизован', () => {
    window.history.pushState({}, '', AppRoute.Login);

    renderWithProviders(<App />, {
      preloadedState: {
        userProcess: { authorizationStatus: AuthorizationStatus.NoAuth, userData: null },
      },
    });

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('должен перенаправлять авторизованного пользователя с /login на главную', () => {
    window.history.pushState({}, '', AppRoute.Login);

    renderWithProviders(<App />, {
      preloadedState: {
        userProcess: { authorizationStatus: AuthorizationStatus.Auth, userData: null },
      },
    });

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('должен перенаправлять на страницу логина при попытке открыть избранное неавторизованным', () => {
    window.history.pushState({}, '', AppRoute.Favorites);

    renderWithProviders(<App />, {
      preloadedState: {
        userProcess: { authorizationStatus: AuthorizationStatus.NoAuth, userData: null },
      },
    });

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('должен показывать страницу 404 для неизвестного маршрута', () => {
    window.history.pushState({}, '', '/unknown-route');

    renderWithProviders(<App />, {
      preloadedState: {
        userProcess: { authorizationStatus: AuthorizationStatus.NoAuth, userData: null },
      },
    });

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});

