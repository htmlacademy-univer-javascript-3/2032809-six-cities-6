import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';
import PrivateRoute from './private-route';
import { AuthorizationStatus } from '../../const';
import { screen } from '@testing-library/react';

describe('Component: PrivateRoute', () => {
  it('должен рендерить контент для авторизованного пользователя', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <div data-testid="private-content" />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div data-testid="login-page" />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          userProcess: { authorizationStatus: AuthorizationStatus.Auth, userData: null },
        },
      }
    );

    expect(screen.getByTestId('private-content')).toBeInTheDocument();
  });

  it('должен перенаправлять неавторизованного пользователя на login', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <div data-testid="private-content" />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div data-testid="login-page" />} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          userProcess: { authorizationStatus: AuthorizationStatus.NoAuth, userData: null },
        },
      }
    );

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});

