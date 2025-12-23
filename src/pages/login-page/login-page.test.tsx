import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './login-page';
import { renderWithProviders } from '../../utils/test-utils';

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
});

