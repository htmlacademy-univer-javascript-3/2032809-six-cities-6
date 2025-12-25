import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './login-page';
import { renderWithProviders } from '../../utils/test-utils';

vi.mock('../../store/action', async () => {
  const actual = await vi.importActual<typeof import('../../store/action')>('../../store/action');
  return {
    ...actual,
    login: () => () => Promise.resolve(),
  };
});

describe('Page: LoginPage', () => {
  it('кнопка рандомного города переключает город и ведет на главную', async () => {
    const user = userEvent.setup();
    const history = createMemoryHistory({ initialEntries: ['/login'] });
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0); // гарантируем выбор Paris

    const { store } = renderWithProviders(
      <Router location={history.location} navigator={history}>
        <LoginPage />
      </Router>
    );

    await user.click(screen.getByRole('button', { name: 'Paris' }));

    expect(store.getState().offersProcess.city).toBe('Paris');
    expect(history.location.pathname).toBe('/');

    randomSpy.mockRestore();
  });

  it('корректный пароль и email проходят валидацию и ведут на главную', async () => {
    const user = userEvent.setup();
    const history = createMemoryHistory({ initialEntries: ['/login'] });

    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <LoginPage />
      </Router>
    );

    await user.type(screen.getByLabelText(/e-mail/i), 'test@test.com');
    await user.type(screen.getByLabelText(/password/i), 'qwerty123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.queryByText(/Password must contain at least one letter and one number/i)).toBeNull();
    expect(history.location.pathname).toBe('/');
  });
});

